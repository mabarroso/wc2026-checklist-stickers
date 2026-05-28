import { useMemo, useState, useCallback, useRef } from 'react';
import { Trash2, Plus, Repeat, Check, Filter, X } from 'lucide-react';
import { useCollectionStore, type FilterType, type SortOrder } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Card, Badge, Header, Button } from '../components';
import { type StickerSection } from '../lib/sticker-sections';
import { buildTeamOptions, filterCollectionStickers, getActiveTeamFilter } from '../lib/collection-view-model';
import { useToastStore } from '../stores/toastStore';
import { useFlagStore } from '../stores/flagStore';
import { getFlagSvg } from '../lib/flag-utils';

const ITEMS_PER_PAGE = 50;

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

const sectionOptions: Array<{ value: 'Todas' | StickerSection; label: string }> = [
  { value: 'Todas', label: 'Todas' },
  { value: 'Panini', label: 'Panini' },
  { value: 'Coca Cola', label: 'Coca cola' },
  { value: "McDonald's", label: "McDonald's" },
  { value: 'Extras', label: 'Extras' },
];

export function ViewCollectionScreen() {
  const { owned, duplicates, filter, sortOrder, setFilter, setSortOrder, markOwned, markDuplicate, unmarkOwned } = useCollectionStore();
  const addToast = useToastStore((s) => s.addToast);
  const showFlags = useFlagStore((s) => s.showFlags);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [sectionFilter, setSectionFilter] = useState<'Todas' | StickerSection>('Panini');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [batchSelected, setBatchSelected] = useState<Set<string>>(new Set());
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allStickers = useMemo(() => getAllStickers(), []);

  const teamOptions = useMemo(
    () => buildTeamOptions(allStickers, sectionFilter),
    [allStickers, sectionFilter],
  );

  const activeTeamFilter = useMemo(
    () => getActiveTeamFilter(teamFilter, teamOptions),
    [teamFilter, teamOptions],
  );

  const filteredStickers = useMemo(
    () => filterCollectionStickers({
      allStickers,
      owned,
      duplicates,
      filter,
      sortOrder,
      sectionFilter,
      teamFilter: activeTeamFilter,
    }),
    [allStickers, owned, duplicates, filter, sortOrder, sectionFilter, activeTeamFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filteredStickers.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageEnd = Math.min(pageStart + ITEMS_PER_PAGE, filteredStickers.length);
  const pageStickers = filteredStickers.slice(pageStart, pageEnd);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleSectionChange = (value: 'Todas' | StickerSection) => {
    setSectionFilter(value);
    setTeamFilter('all');
    setPage(1);
  };

  const handleTeamChange = (value: string) => {
    setTeamFilter(value);
    setPage(1);
  };

  const handleSortChange = (value: SortOrder) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleCardClick = useCallback((stickerId: string) => {
    if (batchMode) {
      setBatchSelected((prev) => {
        const next = new Set(prev);
        if (next.has(stickerId)) {
          next.delete(stickerId);
        } else {
          next.add(stickerId);
        }
        return next;
      });
      return;
    }
    setSelectedSticker(stickerId === selectedSticker ? null : stickerId);
  }, [batchMode, selectedSticker]);

  const handleCardPointerDown = (stickerId: string) => {
    longPressTimer.current = setTimeout(() => {
      setBatchMode(true);
      setBatchSelected(new Set([stickerId]));
      setSelectedSticker(null);
    }, 500);
  };

  const handleCardPointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleCardPointerLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleBatchAdd = () => {
    batchSelected.forEach((id) => markOwned(id, 1));
    addToast({ message: `${batchSelected.size} cromos añadidos al álbum`, variant: 'success' });
    setBatchMode(false);
    setBatchSelected(new Set());
  };

  const handleBatchCancel = () => {
    setBatchMode(false);
    setBatchSelected(new Set());
  };

  const handleRemoveFromAlbum = (stickerId: string) => {
    const dupQty = duplicates[stickerId] || 0;
    if (dupQty > 1) {
      const newDuplicates = { ...duplicates, [stickerId]: dupQty - 1 };
      useCollectionStore.getState().setDuplicates(newDuplicates);
    } else if (dupQty === 1) {
      const newDuplicates = { ...duplicates };
      delete newDuplicates[stickerId];
      useCollectionStore.getState().setDuplicates(newDuplicates);
    } else {
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

        <div className="flex items-center justify-between mb-4">
          <p className="text-[var(--color-white)] opacity-60">
            {filteredStickers.length} cromos
            {totalPages > 1 && ` (página ${currentPage} de ${totalPages})`}
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="xl:hidden flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg bg-[var(--color-surface)] text-[var(--color-white)] text-sm"
            aria-label={showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          >
            <Filter size={16} />
            Filtros
          </button>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} xl:block`}>
          <div className="flex gap-2 mb-4 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`min-h-[44px] px-4 py-2 rounded-lg transition-all ${
                  filter === f.key
                    ? 'bg-[var(--color-cyan)] text-[var(--color-bg)] font-semibold'
                    : 'bg-[var(--color-surface)] text-[var(--color-white)] opacity-70 hover:opacity-100'
                }`}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
            <div className="flex-1" />
            <div className="relative">
              <select
                value={sectionFilter}
                onChange={(e) => handleSectionChange(e.target.value as 'Todas' | StickerSection)}
                className="appearance-none bg-[var(--color-surface)] text-[var(--color-white)] font-semibold px-4 py-2 pr-10 min-h-[44px] rounded-lg cursor-pointer border-2 border-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)] focus:ring-opacity-50 mr-2"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1rem',
                }}
              >
                {sectionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[var(--color-surface)] text-[var(--color-white)]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={activeTeamFilter}
                onChange={(e) => handleTeamChange(e.target.value)}
                className="appearance-none bg-[var(--color-surface)] text-[var(--color-white)] font-semibold px-4 py-2 pr-10 min-h-[44px] rounded-lg cursor-pointer border-2 border-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)] focus:ring-opacity-50 mr-2"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1rem',
                }}
              >
                {teamOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[var(--color-surface)] text-[var(--color-white)]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as SortOrder)}
                className="appearance-none bg-[var(--color-surface)] text-[var(--color-cyan)] font-semibold px-4 py-2 pr-10 min-h-[44px] rounded-lg cursor-pointer border-2 border-[var(--color-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cyan)] focus:ring-opacity-50"
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
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {pageStickers.map((sticker) => {
            const isBatchSelected = batchSelected.has(sticker.id);
            const flagSvg = showFlags ? getFlagSvg(sticker.id) : null;
            return (
              <div
                key={sticker.id}
                className={`cursor-pointer rounded-3xl overflow-hidden transition-all duration-200 ${
                  !batchMode && selectedSticker === sticker.id ? 'ring-4 ring-[var(--color-lime)] ring-offset-2 ring-offset-[var(--color-bg)]' : ''
                } ${isBatchSelected ? 'ring-4 ring-[var(--color-cyan)] ring-offset-2 ring-offset-[var(--color-bg)]' : ''}`}
                onMouseDown={() => handleCardPointerDown(sticker.id)}
                onMouseUp={handleCardPointerUp}
                onMouseLeave={handleCardPointerLeave}
                onTouchStart={() => handleCardPointerDown(sticker.id)}
                onTouchEnd={handleCardPointerUp}
                onTouchCancel={handleCardPointerLeave}
              >
                <Card
                  onClick={() => handleCardClick(sticker.id)}
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
                      <p className="text-xs font-semibold truncate" title={sticker.name}>{sticker.name}</p>
                      <p className="text-xs opacity-60 truncate" title={sticker.team}>{sticker.team}</p>
                      {(owned[sticker.id] || 0) > 0 && (
                        <Badge variant="cyan" className="mt-1">x{owned[sticker.id]}</Badge>
                      )}
                      {(duplicates[sticker.id] || 0) > 0 && (
                        <Badge variant="orange" className="mt-1">R:{duplicates[sticker.id]}</Badge>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      {flagSvg ? <img className="w-8 h-6 object-cover" src={`data:image/svg+xml;utf8,${encodeURIComponent(flagSvg)}`} alt={sticker.id} /> : <span className="text-3xl">⚽</span>}
                      <span className="text-xs font-mono text-[var(--text-muted)] mt-1 truncate max-w-full" title={sticker.id}>{sticker.id}</span>
                    </div>
                    {isBatchSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--color-cyan)] flex items-center justify-center">
                        <Check size={14} className="text-[var(--color-bg)]" />
                      </div>
                    )}
                    {!batchMode && selectedSticker === sticker.id && (
                      <div className="flex justify-center gap-1 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markOwned(sticker.id, 1);
                          }}
                          className="flex-1 flex items-center justify-center min-h-[44px] rounded-lg bg-[var(--color-cyan)] text-[var(--color-bg)] hover:opacity-80 transition-opacity"
                          aria-label="Añadir al álbum"
                          title="Añadir al álbum"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromAlbum(sticker.id);
                          }}
                          className="flex-1 flex items-center justify-center min-h-[44px] rounded-lg bg-[var(--color-surface)] text-[var(--color-white)] hover:bg-red-500 transition-colors"
                          aria-label="Quitar del álbum"
                          title="Quitar del álbum"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markDuplicate(sticker.id, 1);
                          }}
                          className="flex-1 flex items-center justify-center min-h-[44px] rounded-lg bg-[var(--color-orange)] text-[var(--color-bg)] hover:opacity-80 transition-opacity"
                          aria-label="Marcar como repetida"
                          title="Marcar como repetida"
                        >
                          <Repeat size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="min-h-[44px] min-w-[100px] px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-white)] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-hover-strong)] transition-colors"
              aria-label="Página anterior"
            >
              Anterior
            </button>
            <span className="text-sm text-[var(--color-white)] opacity-60">
              {pageStart + 1}-{pageEnd} de {filteredStickers.length}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="min-h-[44px] min-w-[100px] px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-white)] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-hover-strong)] transition-colors"
              aria-label="Página siguiente"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {batchMode && (
        <div className="fixed bottom-28 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3 shadow-lg">
            <span className="text-sm text-[var(--color-white)]">
              {batchSelected.size} seleccionado{batchSelected.size !== 1 ? 's' : ''}
            </span>
            <Button
              size="sm"
              onClick={handleBatchAdd}
              disabled={batchSelected.size === 0}
            >
              <Plus size={16} className="mr-1" />
              Añadir seleccionados
            </Button>
            <button
              onClick={handleBatchCancel}
              className="min-h-[44px] px-3 text-sm text-[var(--color-white)] opacity-60 hover:opacity-100"
              aria-label="Cancelar selección"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
