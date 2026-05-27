import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, Plus, Minus } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Button, Input, Badge, Header } from '../components';

type SortField = 'id' | 'name' | 'quantity';

export function MarkDuplicateScreen() {
  const { duplicates, markDuplicate } = useCollectionStore();
  const [stickerId, setStickerId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortField, setSortField] = useState<SortField>('quantity');
  const [sortAsc, setSortAsc] = useState(false);

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
      .filter((item) => item.sticker)
      .sort((a, b) => {
        const dir = sortAsc ? 1 : -1;
        switch (sortField) {
          case 'id':
            return a.id.localeCompare(b.id) * dir;
          case 'name':
            return (a.sticker?.name ?? '').localeCompare(b.sticker?.name ?? '') * dir;
          case 'quantity':
            return (a.qty - b.qty) * dir;
        }
      });
  }, [duplicates, allStickers, sortField, sortAsc]);

  return (
    <div>
      <Header />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 max-w-xl">
          <p className="mb-4 text-[var(--color-white)] opacity-60">
            Marca cromos repetidos que tienes para intercambiar.
            Si el cromo no est&aacute; en tu &aacute;lbum, se marcar&aacute; primero como "En el &aacute;lbum".
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
                      className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors min-h-[44px]"
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
            <Repeat size={18} className="mr-2" />
            Marcar como Repetida
          </Button>
        </div>

        <div className="w-full md:w-96">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-white)]">
              Tus Repetidas ({duplicateList.length})
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="appearance-none bg-[var(--color-surface)] text-[var(--color-white)] text-sm px-3 py-2 pr-8 rounded-lg cursor-pointer border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '0.75rem',
                }}
              >
                <option value="quantity" className="bg-[var(--color-surface)]">Cantidad</option>
                <option value="id" className="bg-[var(--color-surface)]">ID</option>
                <option value="name" className="bg-[var(--color-surface)]">Nombre</option>
              </select>
              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-white)] border border-white/10 hover:bg-white/10 transition-colors"
                aria-label={sortAsc ? 'Orden descendente' : 'Orden ascendente'}
              >
                <span className={`text-sm transition-transform ${sortAsc ? '' : 'rotate-180'}`}>▲</span>
              </button>
            </div>
          </div>
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
                    <Badge variant="orange">{qty}</Badge>
                    <div>
                      <p className="text-sm font-mono text-[var(--color-cyan)]">
                        {id}
                      </p>
                      <p className="text-xs text-[var(--color-white)] opacity-60">
                        {sticker?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (qty > 1) markDuplicate(id, -1);
                      }}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-orange)] hover:bg-[var(--color-orange)]/20 transition-colors disabled:opacity-30"
                      disabled={qty <= 1}
                      aria-label="Reducir repetidas"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => markDuplicate(id, 1)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-orange)] hover:bg-[var(--color-orange)]/20 transition-colors"
                      aria-label="Aumentar repetidas"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {duplicateList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Repeat size={48} className="text-[var(--color-orange)] opacity-20 mb-4" />
                <p className="text-[var(--color-white)] opacity-40 text-sm">
                  Aún no has marcado cromos repetidos
                </p>
                <p className="text-[var(--color-white)] opacity-30 text-xs mt-1">
                  Marca un cromo como repetido para empezar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
