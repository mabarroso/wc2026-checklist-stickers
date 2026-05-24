import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { ProgressRing, Panel, Header, Button } from '../components';
import { Trash2 } from 'lucide-react';
import { computeStatisticsModel, STATISTICS_SECTION_ORDER } from '../lib/statistics-model';

export function StatisticsScreen() {
  const { owned, duplicates, reset } = useCollectionStore();
  const allStickers = useMemo(() => getAllStickers(), []);

  const stats = useMemo(
    () => computeStatisticsModel(allStickers, owned, duplicates),
    [allStickers, owned, duplicates],
  );

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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Panel className="p-4 flex flex-col items-center">
          <ProgressRing progress={stats.percentage} size={130} strokeWidth={10} />
          <p className="mt-3 text-sm text-[var(--color-white)]">Total</p>
        </Panel>
        {STATISTICS_SECTION_ORDER.map((section) => (
          <Panel key={section} className="p-4 flex flex-col items-center">
            <ProgressRing progress={stats.sectionStats[section].percentage} size={130} strokeWidth={10} />
            <p className="mt-3 text-sm text-[var(--color-white)]">{section}</p>
            <p className="text-xs text-[var(--color-white)] opacity-60">
              {stats.sectionStats[section].owned}/{stats.sectionStats[section].total}
            </p>
          </Panel>
        ))}
      </div>

      <div className="flex gap-8">
        <Panel className="p-4 flex-1">
          <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
            Por equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {stats.sortedPaniniGroups.map((g) => {
              const { owned, total } = stats.groupStats[g];
              const pct = total > 0 ? Math.round((owned / total) * 100) : 0;
              return (
                <div key={g} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-mono text-[var(--color-cyan)]">
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
      </div>
    </div>
  );
}