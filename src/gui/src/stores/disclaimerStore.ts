import { create } from 'zustand';

interface DisclaimerStore {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const useDisclaimerStore = create<DisclaimerStore>((set) => ({
  show: true,
  setShow: (show) => set({ show }),
}));
