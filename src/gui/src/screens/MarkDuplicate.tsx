import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Button, Input, Badge, Header } from '../components';

export function MarkDuplicateScreen() {
  const { duplicates, markDuplicate } = useCollectionStore();
  const [stickerId, setStickerId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allStickers = useMemo(() => getAllStickers(), []);

  const suggestions = useMemo(() => {
    if (stickerId.length === 0) return [];
    return allStickers
      .filter(
        (s) =>
          s.id.toLowerCase().includes(stickerId.toLowerCase()) ||
          s.name.toLowerCase().includes(stickerId.toLowerCase())
      )
      .slice(0, 8);
  }, [allStickers, stickerId]);

    const handleAdd = () => {
      const trimmedStickerId = stickerId.trim();
      if (trimmedStickerId === '') {
        return;
      }
      
      const sticker = allStickers.find(
        (s) => s.id.toLowerCase() === trimmedStickerId.toLowerCase()
      );

      if (sticker) {
        markDuplicate(sticker.id, quantity);
        setStickerId('');
        setQuantity(1);
      } else {
        console.log(`Sticker not found: "${trimmedStickerId}"`);
      }
    };

  const duplicateList = useMemo(() => {
    return Object.entries(duplicates)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const sticker = allStickers.find((s) => s.id === id);
        return { id, qty, sticker };
      })
      .filter((item) => item.sticker);
  }, [duplicates, allStickers]);

  return (
    <div>
      <Header />

      <div className="flex gap-8">
        <div className="flex-1 max-w-xl">
          <p className="mb-4 text-[var(--color-white)] opacity-60">
            Marca cromos duplicados que tienes para intercambiar
          </p>

          <div className="relative mb-4">
            <Input
              placeholder="ID del cromo (ej: MEX-01)"
              value={stickerId}
              onChange={(e) => setStickerId(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              autoFocus
            />
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-[var(--color-surface)] border border-white/10 rounded-xl overflow-hidden"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                      onClick={() => {
                        setStickerId(s.id);
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="font-mono text-[var(--color-orange)]">{s.id}</span>
                      <span className="ml-3 text-[var(--color-white)] opacity-70">
                        {s.name} - {s.team}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-white)]">Cantidad:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="!p-2"
              >
                <span className="text-lg">-</span>
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <Button
                variant="secondary"
                onClick={() => setQuantity((q) => q + 1)}
                className="!p-2"
              >
                <span className="text-lg">+</span>
              </Button>
            </div>
          </div>

          <Button onClick={handleAdd} className="w-full">
            <Repeat size={18} className="mr-2" />
            Marcar como Duplicada
          </Button>
        </div>

        <div className="w-96">
          <h2 className="text-lg font-semibold text-[var(--color-white)] mb-4">
            Tus Duplicadas ({duplicateList.length})
          </h2>
          <div className="space-y-2">
            <AnimatePresence>
              {duplicateList.map(({ id, qty, sticker }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-orange)]/30"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="orange">x{qty}</Badge>
                    <div>
                      <p className="text-sm font-mono text-[var(--color-cyan)]">
                        {id}
                      </p>
                      <p className="text-xs text-[var(--color-white)] opacity-60">
                        {sticker?.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {duplicateList.length === 0 && (
              <p className="text-[var(--color-white)] opacity-40 text-sm">
                Aún no has marcado cromos duplicados
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}