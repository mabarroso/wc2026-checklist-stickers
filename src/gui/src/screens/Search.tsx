import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Repeat } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Card, Badge, Header, Button } from '../components';

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

  const allStickers = useMemo(() => getAllStickers(), []);

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return allStickers
      .filter(
        (s) =>
          s.id.toLowerCase().includes(lowerQuery) ||
          s.name.toLowerCase().includes(lowerQuery) ||
          s.team.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 20);
  }, [allStickers, query]);

  const selectedSticker = useMemo(() => {
    return selectedStickerId ? allStickers.find((s) => s.id === selectedStickerId) : null;
  }, [allStickers, selectedStickerId]);

  const getStatus = (id: string) => {
    const ownedQty = owned[id] || 0;
    const dupQty = duplicates[id] || 0;
    if (dupQty > 0) return 'duplicate';
    if (ownedQty > 0) return 'owned';
    return 'missing';
  };

  const getOwnedQty = (id: string) => owned[id] || 0;
  const getDupQty = (id: string) => duplicates[id] || 0;

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
              type="text"
              placeholder="Buscar por ID, nombre o equipo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[var(--color-surface)] border border-white/10 rounded-xl text-[var(--color-white)] text-lg focus:outline-none focus:border-[var(--color-cyan)]"
              autoFocus
            />
          </div>

          {query && (
            <p className="text-sm text-[var(--color-white)] opacity-60 mb-4">
              {results.length} resultado{results.length !== 1 ? 's' : ''}
            </p>
          )}

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 gap-3">
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
                          className={`text-xs px-2 py-1 rounded transition-all ${
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
                          className={`text-xs px-2 py-1 rounded transition-all ${
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
                          className={`text-xs px-2 py-1 rounded transition-all ${
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

        <div className="w-96 flex-shrink-0">
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