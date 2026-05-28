import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, X, FilePlus } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Button, Input, Header } from '../components';
import { useToastStore } from '../stores/toastStore';

interface RecentlyAdded {
  id: string;
  name: string;
  timestamp: number;
}

export function MarkOwnedScreen() {
  const { markOwned, unmarkOwned } = useCollectionStore();
  const addToast = useToastStore((s) => s.addToast);
  const [stickerId, setStickerId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [recentlyAdded, setRecentlyAdded] = useState<RecentlyAdded[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allStickers = useMemo(() => getAllStickers(), []);

  const isMobile = typeof window !== 'undefined' && !window.matchMedia('(min-width: 48rem)').matches;

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
      (s) => s.id.toLowerCase().includes(trimmedStickerId.toLowerCase())
    );

    if (sticker) {
      markOwned(sticker.id, quantity);
      const newItem = { id: sticker.id, name: sticker.name, timestamp: Date.now() };
      setRecentlyAdded((prev) => [newItem, ...prev.slice(0, 9)]);
      setStickerId('');
      setQuantity(1);

      if (isMobile) {
        addToast({
          message: `${sticker.id} añadido al álbum`,
          variant: 'success',
          undoAction: () => {
            unmarkOwned(sticker.id, 1);
            setRecentlyAdded((prev) => prev.filter((item) => item.id !== sticker.id));
          },
        });
      }
    }
  };

  const handleUndo = (id: string) => {
    unmarkOwned(id, 1);
    setRecentlyAdded((prev) => prev.filter((item) => item.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === '+' || e.key === '=') {
      setQuantity((q) => q + 1);
    } else if (e.key === '-') {
      setQuantity((q) => Math.max(1, q - 1));
    }
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 max-w-xl">
          <p className="mb-4 text-[var(--color-white)] opacity-60">
            Añade cromos al álbum a tu colección
          </p>

          <div className="relative mb-4">
            <Input
              placeholder="ID del cromo (ej: MEX-01)"
              value={stickerId}
              onChange={(e) => setStickerId(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={handleKeyDown}
              autoFocus
              inputMode="text"
            />
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      className="w-full px-4 py-3 text-left hover:bg-[var(--color-hover)] transition-colors min-h-[44px]"
                      onClick={() => {
                        setStickerId(s.id);
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="font-mono text-[var(--color-cyan)]">{s.id}</span>
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
                size="sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Reducir cantidad"
              >
                <Minus size={16} />
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <Button onClick={handleAdd} className="w-full">
            <Check size={18} className="mr-2" />
            Marcar como En el álbum
          </Button>

          <p className="mt-4 text-sm text-[var(--color-white)] opacity-40">
            Presiona Enter para añadir &bull; +/- para ajustar cantidad
          </p>
        </div>

        {!isMobile && (
          <div className="w-80">
            <h2 className="text-lg font-semibold text-[var(--color-white)] mb-4">
              Añadidos Recientemente
            </h2>
            <div className="space-y-2">
              <AnimatePresence>
                {recentlyAdded.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.timestamp}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-green)]/20 flex items-center justify-center">
                        <Check size={16} className="text-[var(--color-green)]" />
                      </div>
                      <div>
                        <p className="text-sm font-mono text-[var(--color-cyan)]">
                          {item.id}
                        </p>
                        <p className="text-xs text-[var(--color-white)] opacity-60">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUndo(item.id)}
                      className="p-3 hover:bg-[var(--color-hover-strong)] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Deshacer"
                    >
                      <X size={16} className="text-[var(--color-red)]" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {recentlyAdded.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FilePlus size={48} className="text-[var(--color-white)] opacity-20 mb-4" />
                  <p className="text-[var(--color-white)] opacity-40 text-sm">
                    Aún no has añadido cromos
                  </p>
                  <p className="text-[var(--color-white)] opacity-30 text-xs mt-1">
                    Busca un cromo por ID o nombre para empezar
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {isMobile && recentlyAdded.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FilePlus size={48} className="text-[var(--color-white)] opacity-20 mb-4" />
            <p className="text-[var(--color-white)] opacity-40 text-sm">
              Aún no has añadido cromos
            </p>
            <p className="text-[var(--color-white)] opacity-30 text-xs mt-1">
              Busca un cromo por ID o nombre para empezar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
