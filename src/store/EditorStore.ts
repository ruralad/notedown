import { create } from "zustand";

interface EditorStoreProps {
  editorStyle: "markdown" | "code";
  setEditorStyle: (style: "markdown" | "code") => void;
}

export const useEditorStore = create<EditorStoreProps>()((set) => ({
  editorStyle: "code",
  setEditorStyle: (style) => set({ editorStyle: style }),
}));
