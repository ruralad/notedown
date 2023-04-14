import { FileEntry } from "@tauri-apps/api/fs";
import { create } from "zustand";

import { NoteProps } from "../../types/Notes";

interface NoteState {
  notes: FileEntry[];
  updateNotes: (allNotes: FileEntry[]) => void;
}

export const useNoteStore = create<NoteState>()((set) => ({
  notes: [],
  updateNotes: (allNotes) => set((state) => ({ notes: allNotes })),
}));

interface ActiveState {
  activeNoteTitle: string;
  activeNote: NoteProps;
  setActiveNoteTitle: (noteName: string) => void;
  setActiveNote: (note: NoteProps) => void;
}

export const useActiveStore = create<ActiveState>()((set) => ({
  activeNoteTitle: "",
  activeNote: {
    content: "",
    noteNo: -1,
    createdAt: "",
    noteId: "",
    title: "",
  },
  setActiveNoteTitle: (noteName) =>
    set((state) => ({ activeNoteTitle: noteName })),
  setActiveNote: (note) => set((state) => ({ activeNote: note })),
}));
