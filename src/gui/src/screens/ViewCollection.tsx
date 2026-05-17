import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Repeat } from 'lucide-react';
import { useCollectionStore, type FilterType, type SortOrder } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Card, Badge, Header, Button } from '../components';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'missing', label: 'Faltantes' },
  { key: 'owned', label: 'En el álbum' },
  { key: 'duplicates', label: 'Repetidas' },
];

const sortOptions: { key: SortOrder; label: string }[] = [
  { key: 'album', label: 'Álbum' },
  { key: 'cromo', label: 'Cromo' },
];

export function ViewCollectionScreen() {
  const { owned, duplicates, filter, sortOrder, setFilter, setSortOrder, markOwned, markDuplicate, unmarkOwned } = useCollectionStore();
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const allStickers = useMemo(() => getAllStickers(), []);

  const filteredStickers = useMemo(() => {
    const filtered = allStickers.filter((sticker) => {
      const ownedQty = owned[sticker.id] || 0;
      const dupQty = duplicates[sticker.id] || 0;

      switch (filter) {
        case 'missing':
          return ownedQty === 0;
        case 'owned':
          return ownedQty > 0;
        case 'duplicates':
          return dupQty > 0;
        default:
          return true;
      }
    });

    if (sortOrder === 'cromo') {
      return [...filtered].sort((a, b) => a.id.localeCompare(b.id));
    }

    return filtered;
  }, [allStickers, owned, duplicates, filter, sortOrder]);

  const handleCardClick = useCallback((stickerId: string) => {
    const currentOwned = owned[stickerId] || 0;
    if (currentOwned === 0) {
      markOwned(stickerId);
    }
    setSelectedSticker(stickerId);
  }, [owned, markOwned, setSelectedSticker]);

  const handleRemoveFromAlbum = (stickerId: string) => {
    const ownedQty = owned[stickerId] || 0;
    if (ownedQty > 0) {
      unmarkOwned(stickerId);
    }
    setSelectedSticker(null);
  };

  const getCardStatus = (stickerId: string) => {
    const ownedQty = owned[stickerId] || 0;
    const dupQty = duplicates[stickerId] || 0;
    if (dupQty > 0) return 'duplicate';
    if (ownedQty > 0) return 'owned';
    return 'missing';
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <Header />

        <p className="mb-4 text-[var(--color-white)] opacity-60">
          {filteredStickers.length} cromos
        </p>

        <div className="flex gap-2 mb-4 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === f.key
                  ? 'bg-[var(--color-cyan)] text-[var(--color-bg)] font-semibold'
                  : 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-70 hover:opacity-100'
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="flex-1" />
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="appearance-none bg-[var(--color-surface)] text-[var(--color-cyan)] font-semibold px-4 py-2 pr-10 rounded-lg cursor-pointer border-2 border-[var(--color-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)] focus:ring-opacity-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233b82f6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-[var(--color-surface)] text-[var(--color-cyan)]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredStickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`cursor-pointer rounded-3xl overflow-hidden transition-all duration-200 ${
                  selectedSticker === sticker.id ? 'ring-2 ring-[var(--color-cyan)]' : ''
                }`}
              >
                <Card
                  onClick={() => {
                    handleCardClick(sticker.id);
                  }}
                  className={`match-card aspect-[3/4] relative ${
                    getCardStatus(sticker.id) === 'owned'
                      ? 'border-2 border-[var(--color-cyan)]'
                      : getCardStatus(sticker.id) === 'duplicate'
                      ? 'border-2 border-[var(--color-orange)]'
                      : ''
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col p-3">
                    <div className="text-center">
                      <p className="text-xs font-semibold truncate">{sticker.name}</p>
                      <p className="text-xs opacity-60">{sticker.team}</p>
                      {(owned[sticker.id] || 0) > 0 && (
                        <Badge variant="cyan" className="mt-1">x{owned[sticker.id]}</Badge>
                      )}
                      {(duplicates[sticker.id] || 0) > 0 && (
                        <Badge variant="orange" className="mt-1">R:{duplicates[sticker.id]}</Badge>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <span className="text-3xl">⚽</span>
                      <span className="text-xs font-mono text-[var(--text-muted)] mt-1">{sticker.id}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedSticker && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="w-80 flex-shrink-0"
        >
          <Card className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-white)] mb-4">
              Acciones
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  markOwned(selectedSticker, 1);
                }}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                Añadir al álbum
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleRemoveFromAlbum(selectedSticker)}
                className="w-full"
              >
                <Trash2 size={16} className="mr-2" />
                Quitar del álbum
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  markDuplicate(selectedSticker, 1);
                }}
                className="w-full"
              >
                <Repeat size={16} className="mr-2" />
                Marcar como repetida
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}