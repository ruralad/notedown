import { writeText } from "@tauri-apps/api/clipboard";
import { readDir, readTextFile } from "@tauri-apps/api/fs";

import type { NoteProps } from "../../types/Notes";
import { notedownFolderPath, pathSeperator } from "./PathUtils";

export const readNotedownFolder = async () => {
  const notes = await readDir(notedownFolderPath, { recursive: true });
  //removing first entry because its the .settings folder
  return notes.splice(1);
};

export const readNote = async (noteName: string) => {
  const contents = await readTextFile(
    notedownFolderPath + pathSeperator + noteName
  );
  const json: NoteProps = JSON.parse(contents);
  return json;
};

export const copyToClipboard = async (noteName: string) => {
  const json = await readNote(noteName);
  await writeText(json.title + "\n" + json.content);
};
