import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { NotedownFolder } from "./DirectoryUtils";

export const readNotedownFolder = async () => {
  const notes = await readDir(NotedownFolder, { recursive: true });
  return notes;
};

export const readNote = async (noteName: string) => {
  const contents = await readTextFile(NotedownFolder + `\\` + noteName);
  return contents;
};
