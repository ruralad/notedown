import { readDir, readTextFile } from "@tauri-apps/api/fs";
import type { NoteProps } from "../../types/Notes";
import { getNotedownFolder, verifyNotedownFolder } from "./DirectoryUtils";

export const readNotedownFolder = async () => {
  verifyNotedownFolder();
  const folder = await getNotedownFolder();
  const notes = await readDir(folder, { recursive: true });
  //removing first entry because its the .settings folder
  return notes.splice(1);
};

export const readNote = async (noteName: string) => {
  const folder = await getNotedownFolder();
  const contents = await readTextFile(folder + `\\` + noteName);
  const json: NoteProps = JSON.parse(contents);
  return json;
};
