import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FlagStore {
  showFlags: boolean;
  toggleFlags: () => void;
}

export const useFlagStore = create<FlagStore>()(
  persist(
    (set) => ({
      showFlags: true,
      toggleFlags: () => set((state) => ({ showFlags: !state.showFlags })),
    }),
    { name: 'show-flags' },
  ),
);
