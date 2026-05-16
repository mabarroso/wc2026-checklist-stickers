import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FilterType = 'all' | 'missing' | 'owned' | 'duplicates';

interface CollectionStore {
  owned: Record<string, number>;
  duplicates: Record<string, number>;
  filter: FilterType;
  searchQuery: string;
  selectedStickerId: string | null;

  setOwned: (owned: Record<string, number>) => void;
  setDuplicates: (duplicates: Record<string, number>) => void;
  markOwned: (stickerId: string, quantity?: number) => void;
  markDuplicate: (stickerId: string, quantity?: number) => void;
  unmarkOwned: (stickerId: string, quantity?: number) => void;
  setFilter: (filter: FilterType) => void;
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
      searchQuery: '',
      selectedStickerId: null,

      setOwned: (owned) => set({ owned }),
      setDuplicates: (duplicates) => set({ duplicates }),

        markOwned: (stickerId) =>
          set((state) => {
            const currentOwned = state.owned[stickerId] || 0;
            const currentDuplicates = state.duplicates[stickerId] || 0;
            
            // Can only have 0 or 1 owned (in album or not)
            // Can only have 0 or 1 duplicates (only if owned is 1)
            let newOwned = currentOwned;
            let newDuplicates = currentDuplicates;
            
            // If we don't have it in album yet, add to owned first (max 1)
            if (newOwned === 0) {
              newOwned = 1;
            }
            
            // If we have it in album and don't have a duplicate yet, add to duplicates (max 1)
            if (newOwned === 1 && newDuplicates === 0) {
              newDuplicates = 1;
            }
  
            const ownedUpdate = newOwned > 0 ? { ...state.owned, [stickerId]: newOwned } : {};
            const duplicatesUpdate = newDuplicates > 0 ? { ...state.duplicates, [stickerId]: newDuplicates } : {};
  
            return {
              owned: ownedUpdate,
              duplicates: duplicatesUpdate,
            };
          }),

        markDuplicate: (stickerId) =>
          set((state) => {
            const currentOwned = state.owned[stickerId] || 0;
            const currentDuplicates = state.duplicates[stickerId] || 0;
            
            // Can only have duplicates if owned is 1
            // Can only have 0 or 1 duplicates
            let newDuplicates = currentDuplicates;
            
            // Toggle duplicate state: if we have the sticker in album (owned=1)
            if (currentOwned === 1) {
              // Toggle between 0 and 1
              newDuplicates = 1 - currentDuplicates;
            }
            
            const duplicatesUpdate = newDuplicates > 0 ? { ...state.duplicates, [stickerId]: newDuplicates } : {};
            
            return {
              duplicates: duplicatesUpdate,
            };
          }),

        unmarkOwned: (stickerId) =>
          set((state) => {
            // When removing from album, clear both owned and duplicates for this sticker
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
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedSticker: (id) => set({ selectedStickerId: id }),

      reset: () => set({ owned: {}, duplicates: {} }),
    }),
    {
      name: 'panini-collection',
      partialize: (state) => ({
        owned: state.owned,
        duplicates: state.duplicates,
      }),
    }
  )
);