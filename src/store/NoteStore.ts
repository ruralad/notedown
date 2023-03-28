import { FileEntry } from "@tauri-apps/api/fs";
import { create } from "zustand";

interface NoteState {
  notes: FileEntry[];
  updateNotes: (allNotes: FileEntry[]) => void;
}

export const useNoteStore = create<NoteState>()((set) => ({
  notes: [],
  updateNotes: (allNotes) => set((state) => ({ notes: allNotes })),
}));

interface ActiveState {
  activeNote: string;
  activeNoteContents: string;
  setActiveNote: (note: string) => void;
  setActiveNoteContents: (content: string) => void;
}

export const useActiveStore = create<ActiveState>()((set) => ({
  activeNote: "",
  activeNoteContents: "",
  setActiveNote: (note) => set((state) => ({ activeNote: note })),
  setActiveNoteContents: (content) =>
    set((state) => ({ activeNoteContents: content })),
}));
