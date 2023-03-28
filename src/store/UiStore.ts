import { create } from "zustand";

interface UiState {
  showDirectory: boolean;
  setShowDirectory: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  showDirectory: true,
  setShowDirectory: () =>
    set((state) => ({ showDirectory: !state.showDirectory })),
}));
