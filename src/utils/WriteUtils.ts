import { renameFile, writeTextFile } from "@tauri-apps/api/fs";
import { useActiveStore, useNoteStore } from "../store/NoteStore";
import { getNotedownFolder } from "./DirectoryUtils";
import { readNotedownFolder } from "./ReadUtils";

/**
 * creates a new note in the Notedown
 */
export const createNewNote = async () => {
  const noteName = `\\Note - ${useNoteStore.getState().notes.length}.txt`;
  writeToNote(noteName, `Note - ${useNoteStore.getState().notes.length} \\n`);
};

export const writeToNote = async (noteName: string, contents: string) => {
  const folder = await getNotedownFolder();
  await writeTextFile(folder + `\\` + noteName, contents);
};

export const renameNote = async (noteName: string, newNoteName: string) => {
  const folder = await getNotedownFolder();
  await renameFile(folder + `\\` + noteName, folder + `\\` + newNoteName).then(
    () =>
      readNotedownFolder().then((notes) => {
        useActiveStore.getState().setActiveNote(newNoteName);
        useNoteStore.getState().updateNotes(notes);
      })
  );
};
