import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Repeat } from 'lucide-react';
import { useCollectionStore, type FilterType } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Card, Badge, Header, Button } from '../components';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'missing', label: 'Faltantes' },
  { key: 'owned', label: 'En el álbum' },
  { key: 'duplicates', label: 'Duplicadas' },
];

export function ViewCollectionScreen() {
  const { owned, duplicates, filter, setFilter, markOwned, markDuplicate, unmarkOwned } = useCollectionStore();
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const allStickers = useMemo(() => getAllStickers(), []);

  const filteredStickers = useMemo(() => {
    return allStickers.filter((sticker) => {
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
  }, [allStickers, owned, duplicates, filter]);

  const handleCardClick = (stickerId: string) => {
    const ownedQty = owned[stickerId] || 0;
    const dupQty = duplicates[stickerId] || 0;

    if (ownedQty > 0 && dupQty > 0) {
      markDuplicate(stickerId, -1);
    } else if (dupQty > 0) {
      markDuplicate(stickerId, -1);
      markOwned(stickerId, 1);
    } else if (ownedQty > 0) {
      markDuplicate(stickerId, 1);
    } else {
      markOwned(stickerId, 1);
    }
    setSelectedSticker(stickerId);
  };

  const handleRemoveFromAlbum = (stickerId: string) => {
    const ownedQty = owned[stickerId] || 0;
    const dupQty = duplicates[stickerId] || 0;

    if (ownedQty > 1) {
      unmarkOwned(stickerId, 1);
    } else if (ownedQty === 1) {
      if (dupQty > 0) {
        markDuplicate(stickerId, -1);
        markOwned(stickerId, 1);
      } else {
        unmarkOwned(stickerId, 1);
      }
      setSelectedSticker(null);
    }
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

        <div className="flex gap-2 mb-6">
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
                onClick={() => handleCardClick(sticker.id)}
                className={`cursor-pointer rounded-3xl overflow-hidden transition-all duration-200 ${
                  selectedSticker === sticker.id ? 'ring-2 ring-[var(--color-cyan)]' : ''
                }`}
              >
                <Card
                  className={`aspect-[3/4] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] relative ${
                    getCardStatus(sticker.id) === 'owned'
                      ? 'border-2 border-[var(--color-cyan)]'
                      : getCardStatus(sticker.id) === 'duplicate'
                      ? 'border-2 border-[var(--color-orange)]'
                      : ''
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col p-3">
                    <div className="text-6xl font-bold opacity-10 absolute -bottom-2 -right-2">
                      {sticker.number}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-3xl">⚽</span>
                    </div>
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
                Marcar como duplicada
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}