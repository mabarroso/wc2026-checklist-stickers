import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Repeat, Users } from 'lucide-react';
import { useCollectionStore, useFlagStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Card, Badge, Header, Button, BottomSheet } from '../components';
import { getFlagEmoji } from '../lib/flag-utils';
import { useDebounce } from '../hooks/useDebounce';

interface Suggestion {
  type: 'id' | 'name' | 'team';
  label: string;
  value: string;
  match: string;
}

const DEBOUNCE_SEARCH_MS = 150;
const DEBOUNCE_ACTION_MS = 300;

export function SearchScreen() {
  const {
    owned,
    duplicates,
    setSelectedSticker,
    selectedStickerId,
    markOwned,
    markDuplicate,
    unmarkOwned,
    setDuplicates,
  } = useCollectionStore();
  const showFlags = useFlagStore((s) => s.showFlags);
  const [query, setQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const prevQueryRef = useRef('');
  const lastActionTime = useRef<Record<string, number>>({});

  const debouncedQuery = useDebounce(query, DEBOUNCE_SEARCH_MS);
  const allStickers = useMemo(() => getAllStickers(), []);

  const isMobile = typeof window !== 'undefined' && !window.matchMedia('(min-width: 64rem)').matches;

  const suggestions = useMemo((): Suggestion[] => {
    if (query.length < 2) return [];
    const lowerQuery = query.toLowerCase();

    const idMatches: Suggestion[] = [];
    const nameMatches: Suggestion[] = [];
    const teamSet = new Set<string>();
    const teamMatches: Suggestion[] = [];

    for (const s of allStickers) {
      if (idMatches.length + nameMatches.length + teamMatches.length >= 8) break;

      const idLow = s.id.toLowerCase();
      const nameLow = s.name.toLowerCase();
      const teamLow = s.team.toLowerCase();

      if (idLow.includes(lowerQuery) && idMatches.length < 3) {
        idMatches.push({ type: 'id', label: s.id, value: s.id, match: s.id });
      }
      if (nameLow.includes(lowerQuery) && nameMatches.length < 3) {
        nameMatches.push({ type: 'name', label: s.name, value: s.id, match: s.name });
      }
      if (teamLow.includes(lowerQuery) && !teamSet.has(s.team)) {
        teamSet.add(s.team);
        teamMatches.push({ type: 'team', label: s.team, value: s.team, match: s.team });
      }
    }

    return [...idMatches, ...nameMatches, ...teamMatches].slice(0, 8);
  }, [allStickers, query]);

  const results = useMemo(() => {
    if (selectedTeam) {
      return allStickers.filter((s) => s.team === selectedTeam);
    }
    if (!debouncedQuery) return [];
    const lowerQuery = debouncedQuery.toLowerCase();
    return allStickers
      .filter(
        (s) =>
          s.id.toLowerCase().includes(lowerQuery) ||
          s.name.toLowerCase().includes(lowerQuery) ||
          s.team.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 20);
  }, [allStickers, debouncedQuery, selectedTeam]);

  const selectedSticker = useMemo(() => {
    return selectedStickerId ? allStickers.find((s) => s.id === selectedStickerId) : null;
  }, [allStickers, selectedStickerId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const withDebounce = (action: () => void, key: string) => {
    const now = Date.now();
    const last = lastActionTime.current[key] || 0;
    if (now - last < DEBOUNCE_ACTION_MS) return;
    lastActionTime.current[key] = now;
    action();
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setShowAutocomplete(false);
    if (suggestion.type === 'team') {
      setSelectedTeam(suggestion.value);
      setQuery(`equipo: ${suggestion.value}`);
      setSelectedSticker(null);
    } else {
      setSelectedTeam(null);
      setQuery(suggestion.value);
      setSelectedSticker(suggestion.value);
      if (isMobile) {
        setShowMobileSheet(true);
      }
    }
  };

  const openDetail = (id: string) => {
    setSelectedSticker(id);
    if (isMobile) {
      setShowMobileSheet(true);
    }
  };

  const getStatus = (id: string) => {
    const ownedQty = owned[id] || 0;
    const dupQty = duplicates[id] || 0;
    if (dupQty > 0) return 'duplicate';
    if (ownedQty > 0) return 'owned';
    return 'missing';
  };

  const getOwnedQty = (id: string) => owned[id] || 0;
  const getDupQty = (id: string) => duplicates[id] || 0;

  const renderSuggestionIcon = (type: string) => {
    switch (type) {
      case 'id': return <span className="text-[var(--color-cyan)] font-mono text-xs">#</span>;
      case 'name': return <span className="text-[var(--color-green)] text-xs">A</span>;
      case 'team': return <Users size={14} className="text-[var(--color-yellow)]" />;
      default: return null;
    }
  };

  const highlightMatch = (text: string, queryStr: string) => {
    if (!queryStr) return text;
    const idx = text.toLowerCase().indexOf(queryStr.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-[var(--color-cyan)] font-semibold">{text.slice(idx, idx + queryStr.length)}</span>
        {text.slice(idx + queryStr.length)}
      </>
    );
  };

  const renderStickerActions = (stickerId: string, small?: boolean) => {
    const ownedQty = getOwnedQty(stickerId);
    const dupQty = getDupQty(stickerId);
    const btnClass = small
      ? 'flex-1 flex items-center justify-center min-h-[44px] rounded-lg text-sm transition-all'
      : 'flex-1 flex items-center justify-center min-h-[44px] rounded-lg text-sm transition-all';

    return (
      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            withDebounce(() => markOwned(stickerId), `own-${stickerId}`);
          }}
          disabled={ownedQty > 0}
          className={`${btnClass} ${
            ownedQty > 0
              ? 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-30 cursor-not-allowed'
              : 'bg-[var(--color-cyan)]/20 text-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/30'
          }`}
          aria-label="Añadir al álbum"
          title="Añadir al álbum"
        >
          <Plus size={small ? 14 : 16} className="mr-1" />
          Añadir
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            withDebounce(() => {
              if (dupQty > 1) {
                setDuplicates({ ...duplicates, [stickerId]: dupQty - 1 });
              } else if (dupQty === 1) {
                const newDuplicates = { ...duplicates };
                delete newDuplicates[stickerId];
                setDuplicates(newDuplicates);
              } else {
                unmarkOwned(stickerId);
              }
            }, `remove-${stickerId}`);
          }}
          disabled={ownedQty === 0 && dupQty === 0}
          className={`${btnClass} ${
            ownedQty === 0 && dupQty === 0
              ? 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-30 cursor-not-allowed'
              : 'bg-[var(--color-white)]/10 text-[var(--color-white)] hover:bg-[var(--color-white)]/20'
          }`}
          aria-label="Quitar del álbum"
          title="Quitar del álbum"
        >
          <Trash2 size={small ? 14 : 16} className="mr-1" />
          Quitar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            withDebounce(() => markDuplicate(stickerId), `dup-${stickerId}`);
          }}
          className={`${btnClass} bg-[var(--color-orange)]/20 text-[var(--color-orange)] hover:bg-[var(--color-orange)]/30`}
          aria-label="Marcar como repetida"
          title="Marcar como repetida"
        >
          <Repeat size={small ? 14 : 16} className="mr-1" />
          Repetir
        </button>
      </div>
    );
  };

  return (
    <div>
      <Header />

      <div className="flex gap-6 h-[calc(100vh-140px)]">
        <div className="flex-1 flex flex-col">
          <p className="mb-4 text-[var(--color-white)] opacity-60">
            Busca cromos por ID, nombre o equipo
          </p>

          <div className="relative mb-4">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-white)] opacity-40"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar por ID, nombre o equipo..."
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                const prevVal = prevQueryRef.current;
                prevQueryRef.current = val;
                setQuery(val);
                setShowAutocomplete(val.length >= 2);
                if (!val && prevVal.startsWith('equipo:')) {
                  setSelectedTeam(null);
                }
              }}
              onFocus={() => {
                if (query.length >= 2) {
                  setShowAutocomplete(true);
                }
              }}
              className="w-full pl-12 pr-4 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-white)] text-lg focus:outline-none focus:border-[var(--color-cyan)]"
              autoFocus
            />

            {showAutocomplete && (
              <div
                ref={autocompleteRef}
                className="absolute z-50 left-0 right-0 top-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden"
              >
                {suggestions.map((s, i) => (
                  <button
                    key={`${s.type}-${s.value}-${i}`}
                    onClick={() => handleSuggestionClick(s)}
                    className="w-full flex items-center gap-3 px-4 min-h-[44px] text-left hover:bg-[var(--color-hover)] transition-colors border-b border-[var(--color-border-light)] last:border-b-0"
                  >
                    <span className="flex-shrink-0 w-5 flex justify-center">
                      {renderSuggestionIcon(s.type)}
                    </span>
                    <span className="text-sm text-[var(--color-white)] truncate">
                      {highlightMatch(s.label, query)}
                    </span>
                    <span className="ml-auto text-[10px] uppercase text-[var(--color-white)] opacity-40">
                      {s.type === 'id' ? 'ID' : s.type === 'name' ? 'Nombre' : 'Equipo'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {query && !selectedTeam && (
            <p className="text-sm text-[var(--color-white)] opacity-60 mb-4">
              {results.length} resultado{results.length !== 1 ? 's' : ''}
            </p>
          )}

          {selectedTeam && (
            <p className="text-sm text-[var(--color-yellow)] mb-4">
              <Users size={14} className="inline mr-1" />
              {selectedTeam} &mdash; {results.length} cromo{results.length !== 1 ? 's' : ''}
            </p>
          )}

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <AnimatePresence>
                {results.map((sticker) => {
                  const status = getStatus(sticker.id);
                  const ownedQty = getOwnedQty(sticker.id);
                  const dupQty = getDupQty(sticker.id);

                  return (
                    <motion.div
                      key={sticker.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => openDetail(sticker.id)}
                      className={`cursor-pointer rounded-xl p-3 transition-all ${
                        selectedStickerId === sticker.id
                          ? 'bg-[var(--color-cyan)]/20 border border-[var(--color-cyan)]'
                          : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)]'
                      }`}
                    >
                      <p className="text-xs font-mono text-[var(--color-cyan)] truncate" title={sticker.id}>
                        {sticker.id}
                      </p>
                      <p className="text-sm truncate text-[var(--color-white)]" title={sticker.name}>
                        {sticker.name}
                      </p>
                      <p className="text-xs text-[var(--color-white)] opacity-60 truncate" title={sticker.team}>
                        {sticker.team}
                      </p>
                      {status !== 'missing' && (
                        <div className="flex gap-1 mt-2">
                          {ownedQty > 0 && (
                            <Badge variant="cyan">x{ownedQty}</Badge>
                          )}
                          {dupQty > 0 && (
                            <Badge variant="orange">R:{dupQty}</Badge>
                          )}
                        </div>
                      )}
                      {renderStickerActions(sticker.id, true)}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-96 flex-shrink-0 hidden xl:block">
          <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
            Vista Previa
          </h2>
          {selectedSticker ? (
            <Card className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] aspect-[3/4] flex flex-col items-center justify-center p-6">
              <div className="text-6xl mb-4">{showFlags ? getFlagEmoji(selectedSticker.id) ?? '⚽' : '⚽'}</div>
              <p className="text-4xl font-bold text-[var(--color-cyan)] mb-2">
                {selectedSticker.id}
              </p>
              <p className="text-xl text-[var(--color-white)] text-center">
                {selectedSticker.name}
              </p>
              <p className="text-sm text-[var(--color-white)] opacity-60">
                {selectedSticker.team}
              </p>
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                {getOwnedQty(selectedSticker.id) > 0 && (
                  <Badge variant="cyan">
                    En el álbum x{getOwnedQty(selectedSticker.id)}
                  </Badge>
                )}
                {getDupQty(selectedSticker.id) > 0 && (
                  <Badge variant="orange">
                    Repetida x{getDupQty(selectedSticker.id)}
                  </Badge>
                )}
              </div>
              <div className="mt-6 space-y-2 w-full">
                <Button
                  onClick={() => markOwned(selectedSticker.id)}
                  className="w-full"
                  disabled={getOwnedQty(selectedSticker.id) > 0}
                >
                  <Plus size={16} className="mr-2" />
                  Añadir al álbum
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const dupQty = getDupQty(selectedSticker.id);
                    if (dupQty > 1) {
                      setDuplicates({ ...duplicates, [selectedSticker.id]: dupQty - 1 });
                    } else if (dupQty === 1) {
                      const newDups = { ...duplicates };
                      delete newDups[selectedSticker.id];
                      setDuplicates(newDups);
                    } else {
                      unmarkOwned(selectedSticker.id);
                    }
                  }}
                  className="w-full"
                  disabled={getOwnedQty(selectedSticker.id) === 0 && getDupQty(selectedSticker.id) === 0}
                >
                  <Trash2 size={16} className="mr-2" />
                  Quitar del álbum
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => markDuplicate(selectedSticker.id)}
                  className="w-full"
                >
                  <Repeat size={16} className="mr-2" />
                  Marcar como repetida
                </Button>
              </div>
            </Card>
          ) : (
            <div className="h-96 flex items-center justify-center text-[var(--color-white)] opacity-40">
              Selecciona un cromo para ver detalles
            </div>
          )}
        </div>
      </div>

      <BottomSheet
        show={showMobileSheet}
        onClose={() => {
          setShowMobileSheet(false);
          setSelectedSticker(null);
        }}
      >
        {selectedSticker && (
          <div className="flex flex-col items-center py-4">
            <div className="text-6xl mb-4">{showFlags ? getFlagEmoji(selectedSticker.id) ?? '⚽' : '⚽'}</div>
            <p className="text-3xl font-bold text-[var(--color-cyan)] mb-2">
              {selectedSticker.id}
            </p>
            <p className="text-lg text-[var(--color-white)] text-center">
              {selectedSticker.name}
            </p>
            <p className="text-sm text-[var(--color-white)] opacity-60 mb-4">
              {selectedSticker.team}
            </p>
            <div className="flex gap-2 mb-4">
              {getOwnedQty(selectedSticker.id) > 0 && (
                <Badge variant="cyan">
                  En el álbum x{getOwnedQty(selectedSticker.id)}
                </Badge>
              )}
              {getDupQty(selectedSticker.id) > 0 && (
                <Badge variant="orange">
                  Repetida x{getDupQty(selectedSticker.id)}
                </Badge>
              )}
            </div>
            <div className="space-y-2 w-full">
              <Button
                className="w-full"
                onClick={() => markOwned(selectedSticker.id)}
                disabled={getOwnedQty(selectedSticker.id) > 0}
              >
                <Plus size={16} className="mr-2" />
                Añadir al álbum
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  const dupQty = getDupQty(selectedSticker.id);
                  if (dupQty > 1) {
                    setDuplicates({ ...duplicates, [selectedSticker.id]: dupQty - 1 });
                  } else if (dupQty === 1) {
                    const newDups = { ...duplicates };
                    delete newDups[selectedSticker.id];
                    setDuplicates(newDups);
                  } else {
                    unmarkOwned(selectedSticker.id);
                  }
                }}
                disabled={getOwnedQty(selectedSticker.id) === 0 && getDupQty(selectedSticker.id) === 0}
              >
                <Trash2 size={16} className="mr-2" />
                Quitar del álbum
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => markDuplicate(selectedSticker.id)}
              >
                <Repeat size={16} className="mr-2" />
                Marcar como repetida
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
