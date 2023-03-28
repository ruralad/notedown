import { renameFile, writeTextFile } from "@tauri-apps/api/fs";
import { useActiveStore, useNoteStore } from "../store/NoteStore";
import { NotedownFolder } from "./DirectoryUtils";
import { readNotedownFolder } from "./ReadUtils";

/**
 * creates a new note in the Notedown
 */
export const createNewNote = async () => {
  const noteName = `\\Note - ${useNoteStore.getState().notes.length}.txt`;
  writeToNote(noteName, `Note - ${useNoteStore.getState().notes.length} \\n`);
};

export const writeToNote = async (noteName: string, contents: string) => {
  await writeTextFile(NotedownFolder + `\\` + noteName, contents);
};

export const renameNote = async (noteName: string, newNoteName: string) => {
  await renameFile(
    NotedownFolder + `\\` + noteName,
    NotedownFolder + `\\` + newNoteName
  ).then(() =>
    readNotedownFolder().then((notes) => {
      useActiveStore.getState().setActiveNote(newNoteName);
      useNoteStore.getState().updateNotes(notes);
    })
  );
};
