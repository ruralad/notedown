import { writeText } from "@tauri-apps/api/clipboard";
import { readDir, readTextFile } from "@tauri-apps/api/fs";

import { getNotedownFolder } from "./DirectoryUtils";

import type { NoteProps } from "../../types/Notes";

export const readNotedownFolder = async () => {
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

export const copyToClipboard = async (noteName: string) => {
  const json = await readNote(noteName);
  await writeText(json.title + "\n" + json.content);
};
