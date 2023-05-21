import { writeText } from "@tauri-apps/api/clipboard";
import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { sep } from "@tauri-apps/api/path";

import type { NoteProps } from "../../types/Notes";
import { getNotedownFolderPath } from "./PathUtils";

export const readNotedownFolder = async () => {
  const notes = await readDir(await getNotedownFolderPath(), {
    recursive: true,
  });
  //removing first entry because its the .settings folder
  return notes.splice(1);
};

export const readNote = async (noteName: string) => {
  const contents = await readTextFile(
    (await getNotedownFolderPath()) + sep + noteName
  );
  const json: NoteProps = JSON.parse(contents);
  return json;
};

export const copyToClipboard = async (noteName: string) => {
  const json = await readNote(noteName);
  await writeText(json.title + "\n" + json.content);
};
