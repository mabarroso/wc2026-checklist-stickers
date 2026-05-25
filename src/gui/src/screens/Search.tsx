import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Repeat, Users } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Card, Badge, Header, Button } from '../components';

interface Suggestion {
  type: 'id' | 'name' | 'team';
  label: string;
  value: string;
  match: string;
}

export function SearchScreen() {
  const {
    owned,
    duplicates,
    setSelectedSticker,
    selectedStickerId,
    markOwned,
    markDuplicate,
    unmarkOwned,
  } = useCollectionStore();
  const [query, setQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const prevQueryRef = useRef('');

  const allStickers = useMemo(() => getAllStickers(), []);

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
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return allStickers
      .filter(
        (s) =>
          s.id.toLowerCase().includes(lowerQuery) ||
          s.name.toLowerCase().includes(lowerQuery) ||
          s.team.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 20);
  }, [allStickers, query, selectedTeam]);

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
              className="w-full pl-12 pr-4 py-4 bg-[var(--color-surface)] border border-white/10 rounded-xl text-[var(--color-white)] text-lg focus:outline-none focus:border-[var(--color-cyan)]"
              autoFocus
            />

            {showAutocomplete && (
              <div
                ref={autocompleteRef}
                className="absolute z-50 left-0 right-0 top-full mt-1 bg-[var(--color-surface)] border border-white/10 rounded-xl shadow-xl overflow-hidden"
              >
                {suggestions.map((s, i) => (
                  <button
                    key={`${s.type}-${s.value}-${i}`}
                    onClick={() => handleSuggestionClick(s)}
                    className="w-full flex items-center gap-3 px-4 min-h-[44px] text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
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
              {selectedTeam} — {results.length} cromo{results.length !== 1 ? 's' : ''}
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
                      onClick={() => setSelectedSticker(sticker.id)}
                      className={`cursor-pointer rounded-xl p-3 transition-all ${
                        selectedStickerId === sticker.id
                          ? 'bg-[var(--color-cyan)]/20 border border-[var(--color-cyan)]'
                          : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)]'
                      }`}
                    >
                      <p className="text-xs font-mono text-[var(--color-cyan)]">
                        {sticker.id}
                      </p>
                      <p className="text-sm truncate text-[var(--color-white)]">
                        {sticker.name}
                      </p>
                      <p className="text-xs text-[var(--color-white)] opacity-60">
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
                      <div className="flex gap-1 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markOwned(sticker.id);
                          }}
                          disabled={ownedQty > 0}
                          className={`text-sm px-3 py-2 min-h-[36px] rounded transition-all ${
                            ownedQty > 0
                              ? 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-30 cursor-not-allowed'
                              : 'bg-[var(--color-cyan)]/20 text-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/30'
                          }`}
                        >
                          Añadir
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            unmarkOwned(sticker.id);
                          }}
                          disabled={ownedQty === 0}
                          className={`text-sm px-3 py-2 min-h-[36px] rounded transition-all ${
                            ownedQty === 0
                              ? 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-30 cursor-not-allowed'
                              : 'bg-[var(--color-white)]/10 text-[var(--color-white)] hover:bg-[var(--color-white)]/20'
                          }`}
                        >
                          Quitar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markDuplicate(sticker.id);
                          }}
                          disabled={dupQty > 0}
                          className={`text-sm px-3 py-2 min-h-[36px] rounded transition-all ${
                            dupQty > 0
                              ? 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-30 cursor-not-allowed'
                              : 'bg-[var(--color-orange)]/20 text-[var(--color-orange)] hover:bg-[var(--color-orange)]/30'
                          }`}
                        >
                          Repetir
                        </button>
                      </div>
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
              <div className="text-6xl mb-4">⚽</div>
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
                  onClick={() => unmarkOwned(selectedSticker.id)}
                  className="w-full"
                  disabled={getOwnedQty(selectedSticker.id) === 0}
                >
                  <Trash2 size={16} className="mr-2" />
                  Quitar del álbum
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => markDuplicate(selectedSticker.id)}
                  className="w-full"
                  disabled={getDupQty(selectedSticker.id) > 0}
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
    </div>
  );
}