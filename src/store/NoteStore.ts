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

export const useActiveNoteStore = create<ActiveState>()((set) => ({
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

type NoteDetailsProps = {
  line: number;
  column: number;
  setLineAndColumn: (line: number, column: number) => void;
};

export const useNoteDetailsStore = create<NoteDetailsProps>()((set) => ({
  line: 0,
  column: 0,
  setLineAndColumn: (line, column) => set((state) => ({ line, column })),
}));
