import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FilterType = 'all' | 'missing' | 'owned' | 'duplicates';
export type SortOrder = 'album' | 'cromo';

function migrateStickerId(id: string): string {
  return id.replace(/([A-Z]+)(\d)$/, (_, prefix, num) => prefix + '0' + num);
}

function needsMigration(owned: Record<string, number>, duplicates: Record<string, number>): boolean {
  const keys = [...Object.keys(owned), ...Object.keys(duplicates)];
  return keys.some(key => /\d$/.test(key) && /[A-Z]+[1-9]$/.test(key));
}

interface CollectionStore {
  owned: Record<string, number>;
  duplicates: Record<string, number>;
  filter: FilterType;
  sortOrder: SortOrder;
  searchQuery: string;
  selectedStickerId: string | null;
  migrated: boolean;

  setOwned: (owned: Record<string, number>) => void;
  setDuplicates: (duplicates: Record<string, number>) => void;
  markOwned: (stickerId: string, quantity?: number) => void;
  markDuplicate: (stickerId: string, quantity?: number) => void;
  unmarkOwned: (stickerId: string, quantity?: number) => void;
  setFilter: (filter: FilterType) => void;
  setSortOrder: (order: SortOrder) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSticker: (id: string | null) => void;
  reset: () => void;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      owned: {},
      duplicates: {},
      filter: 'all',
      sortOrder: 'album',
      searchQuery: '',
      selectedStickerId: null,
      migrated: false,

      setOwned: (owned) => set({ owned }),
      setDuplicates: (duplicates) => set({ duplicates }),

      markOwned: (stickerId) =>
        set((state) => {
          const currentOwned = state.owned[stickerId] || 0;
          if (currentOwned === 0) {
            return { owned: { ...state.owned, [stickerId]: 1 } };
          }
          return {};
        }),

      markDuplicate: (stickerId, quantity = 1) =>
        set((state) => {
          const currentOwned = state.owned[stickerId] || 0;
          const currentDuplicates = state.duplicates[stickerId] || 0;
          const newDuplicates = Math.max(0, currentDuplicates + quantity);

          if (currentOwned === 0) {
            return {
              owned: { ...state.owned, [stickerId]: 1 },
              duplicates: { ...state.duplicates, [stickerId]: newDuplicates || 1 },
            };
          }

          if (newDuplicates === 0) {
            const rest = { ...state.duplicates };
            delete rest[stickerId];
            return { duplicates: rest };
          }

          return {
            duplicates: { ...state.duplicates, [stickerId]: newDuplicates },
          };
        }),

      unmarkOwned: (stickerId) =>
        set((state) => {
          const restOwned = { ...state.owned };
          delete restOwned[stickerId];
          const restDuplicates = { ...state.duplicates };
          delete restDuplicates[stickerId];

          return {
            owned: restOwned,
            duplicates: restDuplicates,
          };
        }),

      setFilter: (filter) => set({ filter }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedSticker: (id) => set({ selectedStickerId: id }),

      reset: () => set({ owned: {}, duplicates: {}, sortOrder: 'album' }),
    }),
    {
      name: 'wc26-collection',
      partialize: (state) => ({
        owned: state.owned,
        duplicates: state.duplicates,
        sortOrder: state.sortOrder,
        migrated: state.migrated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (needsMigration(state.owned, state.duplicates)) {
            const migratedOwned: Record<string, number> = {};
            const migratedDuplicates: Record<string, number> = {};

            for (const [id, qty] of Object.entries(state.owned)) {
              migratedOwned[migrateStickerId(id)] = qty;
            }

            for (const [id, qty] of Object.entries(state.duplicates)) {
              const migratedId = migrateStickerId(id);
              migratedOwned[migratedId] = (migratedOwned[migratedId] || 0) + qty;
            }

            state.owned = migratedOwned;
            state.duplicates = migratedDuplicates;
            state.migrated = true;
          }
        }
      },
    }
  )
);