import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { ProgressRing, Panel, Badge, Header, Button } from '../components';
import { Trash2 } from 'lucide-react';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export function StatisticsScreen() {
  const { owned, duplicates, reset } = useCollectionStore();
  const allStickers = useMemo(() => getAllStickers(), []);

   const stats = useMemo(() => {
     const total = allStickers.length;
     const uniqueOwned = Object.keys(owned).length;
     const totalOwned = Object.values(owned).reduce((a, b) => a + b, 0);
     const totalDuplicates = Object.values(duplicates).reduce((a, b) => a + b, 0);
     const missing = total - uniqueOwned;
     const percentage = Math.round((uniqueOwned / total) * 100);

     const groupStats: Record<string, { owned: number; total: number }> = {};
     GROUPS.forEach((g) => {
       const groupStickers = allStickers.filter((s) => s.group === g);
       const groupOwned = groupStickers.filter((s) => owned[s.id]).length;
       groupStats[g] = { owned: groupOwned, total: groupStickers.length };
     });

     const topDuplicates = Object.entries(duplicates)
       .sort((a, b) => b[1] - a[1])
       .slice(0, 5)
       .map(([id, qty]) => ({
         id,
         qty,
         sticker: allStickers.find((s) => s.id === id),
       }));

     return { total, uniqueOwned, totalOwned, totalDuplicates, missing, percentage, groupStats, topDuplicates };
   }, [allStickers, owned, duplicates]);

   const handleReset = () => {
     if (window.confirm('¿Estás seguro de que quieres borrar toda la colección y comenzar de nuevo? Esta acción no se puede deshacer.')) {
       reset();
     }
   };

   return (
     <div>
       <div className="mb-6">
         <Button onClick={handleReset} className="w-full">
           <Trash2 size={18} className="mr-2" />
           Borrar colección y comenzar de nuevo
         </Button>
       </div>
       <Header />

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Panel className="p-4 text-center">
          <p className="text-3xl font-bold text-[var(--color-white)]">{stats.total}</p>
          <p className="text-sm text-[var(--color-white)] opacity-60">Total</p>
        </Panel>
        <Panel className="p-4 text-center">
          <p className="text-3xl font-bold text-[var(--color-cyan)]">{stats.totalOwned}</p>
          <p className="text-sm text-[var(--color-white)] opacity-60">En el álbum</p>
        </Panel>
        <Panel className="p-4 text-center">
          <p className="text-3xl font-bold text-[var(--color-red)]">{stats.missing}</p>
          <p className="text-sm text-[var(--color-white)] opacity-60">Faltantes</p>
        </Panel>
        <Panel className="p-4 text-center">
          <p className="text-3xl font-bold text-[var(--color-orange)]">{stats.totalDuplicates}</p>
          <p className="text-sm text-[var(--color-white)] opacity-60">Duplicadas</p>
        </Panel>
      </div>

      <div className="flex gap-8">
        <div className="flex-shrink-0">
          <Panel className="p-8 flex flex-col items-center">
            <ProgressRing progress={stats.percentage} size={180} strokeWidth={12} />
            <p className="mt-4 text-lg text-[var(--color-white)]">Completado</p>
          </Panel>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6">
          <Panel className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              Por Grupo
            </h2>
            <div className="space-y-3">
              {GROUPS.map((g) => {
                const { owned, total } = stats.groupStats[g];
                const pct = total > 0 ? (owned / total) * 100 : 0;
                return (
                  <div key={g} className="flex items-center gap-3">
                    <span className="w-8 text-sm font-mono text-[var(--color-cyan)]">
                      {g}
                    </span>
                    <div className="flex-1 h-3 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-cyan-dark)]"
                      />
                    </div>
                    <span className="w-12 text-right text-sm text-[var(--color-white)] opacity-60">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              Top Duplicadas
            </h2>
            <div className="space-y-2">
              {stats.topDuplicates.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
                >
                  <span className="w-8 text-center">
                    {i === 0 && '🥇'}
                    {i === 1 && '🥈'}
                    {i === 2 && '🥉'}
                    {i > 2 && <span className="text-lg">{i + 1}</span>}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-mono text-[var(--color-orange)]">
                      {item.id}
                    </p>
                    <p className="text-xs text-[var(--color-white)] opacity-60">
                      {item.sticker?.name}
                    </p>
                  </div>
                  <Badge variant="orange">x{item.qty}</Badge>
                </motion.div>
              ))}
              {stats.topDuplicates.length === 0 && (
                <p className="text-[var(--color-white)] opacity-40 text-sm">
                  Aún no hay duplicadas
                </p>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}