import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface AppState {
  navigationOpen: boolean;
}

const useAppStore = create(
  subscribeWithSelector<AppState>(() => ({
    navigationOpen: false,
  })),
);

export { useAppStore };

// bears: 0,
// increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
// removeAllBears: () => set({ bears: 0 }),
