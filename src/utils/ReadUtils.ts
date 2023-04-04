import { readDir, readTextFile } from "@tauri-apps/api/fs";
import type { NoteProps } from "../../types/Notes";
import { getNotedownFolder } from "./DirectoryUtils";
export const readNotedownFolder = async () => {
  const folder = await getNotedownFolder();
  const notes = await readDir(folder, { recursive: true });
  return notes;
};

export const readNote = async (noteName: string) => {
  const folder = await getNotedownFolder();
  const contents = await readTextFile(folder + `\\` + noteName);
  const json: NoteProps = JSON.parse(contents);
  return json;
};
