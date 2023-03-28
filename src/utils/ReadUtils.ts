import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { getNotedownFolder } from "./DirectoryUtils";

export const readNotedownFolder = async () => {
  const folder = await getNotedownFolder();
  const notes = await readDir(folder, { recursive: true });
  return notes;
};

export const readNote = async (noteName: string) => {
  const folder = await getNotedownFolder();
  const contents = await readTextFile(folder + `\\` + noteName);
  return contents;
};
