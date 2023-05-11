import { create } from "zustand";

type UiStoreProps = {
  focusMode: boolean;
  editorActive: boolean;
  setFocusMode: () => void;
  setEditorActive: (status: boolean) => void;
};

export const useUiStore = create<UiStoreProps>()((set) => ({
  focusMode: true,
  editorActive: false,
  setFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
  setEditorActive: (status) => set((state) => ({ editorActive: status })),
}));
