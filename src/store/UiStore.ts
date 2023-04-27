import { create } from "zustand";

interface UiState {
  focusMode: boolean;
  setFocusMode: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  focusMode: true,
  setFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
}));
