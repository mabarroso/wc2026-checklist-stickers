import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCollectionStore, useFlagStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { ProgressRing, Panel, Header } from '../components';
import { getFlagSvg } from '../lib/flag-utils';
import { computeStatisticsModel, STATISTICS_SECTION_ORDER } from '../lib/statistics-model';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function StatisticsScreen() {
  const { owned, duplicates } = useCollectionStore();
  const showFlags = useFlagStore((s) => s.showFlags);
  const allStickers = useMemo(() => getAllStickers(), []);

  const stats = useMemo(
    () => computeStatisticsModel(allStickers, owned, duplicates),
    [allStickers, owned, duplicates],
  );

  const sections = useMemo(() => {
    const groups = chunkArray(stats.sortedPaniniGroups, 8);
    return groups.map((group, i) => ({
      id: `section-${i}`,
      label: group.length > 0
        ? `${group[0]} - ${group[group.length - 1]}`
        : 'Equipos',
      teams: group,
    }));
  }, [stats.sortedPaniniGroups]);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    return sections.length > 0 ? new Set([sections[0].id]) : new Set();
  });

  const allExpanded = expandedSections.size === sections.length;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(sections.map((s) => s.id)));
    }
  };

  return (
    <div>
      <Header />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Panel className="p-4 text-center">
          <p className="text-3xl font-bold text-[var(--color-white)]">{stats.total}</p>
          <p className="text-sm text-[var(--color-white)] opacity-60">Total</p>
        </Panel>
        <Panel className="p-4 text-center">
          <p className="text-3xl font-bold text-[var(--color-cyan)]">{stats.totalOwned}</p>
          <p className="text-sm text-[var(--color-white)] opacity-60">En el &aacute;lbum</p>
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

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        <Panel className="p-4 flex flex-col items-center">
          <ProgressRing progress={stats.percentage} size={100} strokeWidth={8} />
          <p className="mt-3 text-sm text-[var(--color-white)]">Total</p>
        </Panel>
        {STATISTICS_SECTION_ORDER.map((section) => (
          <Panel key={section} className="p-4 flex flex-col items-center">
            <ProgressRing progress={stats.sectionStats[section].percentage} size={100} strokeWidth={8} />
            <p className="mt-3 text-sm text-[var(--color-white)]">{section}</p>
            <p className="text-xs text-[var(--color-white)] opacity-60">
              {stats.sectionStats[section].owned}/{stats.sectionStats[section].total}
            </p>
          </Panel>
        ))}
      </div>

      <div className="flex gap-8">
        <Panel className="p-4 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-white)]">
              Por equipo
            </h2>
            <button
              onClick={toggleAll}
              className="text-xs font-medium text-[var(--color-cyan)] hover:opacity-80 transition-opacity min-h-[44px] px-2"
              aria-label={allExpanded ? 'Colapsar todo' : 'Desplegar todo'}
            >
              {allExpanded ? 'Colapsar todo' : 'Desplegar todo'}
            </button>
          </div>
          <div className="space-y-2">
            {sections.map((section) => {
              const isExpanded = expandedSections.has(section.id);
              return (
                <div key={section.id} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)] transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span className="text-sm font-semibold text-[var(--color-white)]">
                      Equipos {section.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-[var(--color-white)] opacity-60">
                        {section.teams.length} equipos
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} className="text-[var(--color-white)] opacity-60" />
                      </motion.span>
                    </span>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-3">
                          {section.teams.map((g) => {
                            const { owned: teamOwned, total } = stats.groupStats[g];
                            const pct = total > 0 ? Math.round((teamOwned / total) * 100) : 0;
                            return (
                              <div key={g} className="flex items-center gap-3">
                                <span className="w-14 text-sm font-mono text-[var(--color-cyan)] shrink-0 flex items-center gap-1">
                                  {showFlags && getFlagSvg(g + '01') && <img className="w-6 h-4 object-cover inline-block" src={`data:image/svg+xml;utf8,${encodeURIComponent(getFlagSvg(g + '01')!)}`} alt={g} />}
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
                                <span className="w-12 text-right text-sm text-[var(--color-white)] opacity-60 shrink-0">
                                  {pct}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
