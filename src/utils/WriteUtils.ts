import { renameFile, writeTextFile } from "@tauri-apps/api/fs";
import { useActiveStore, useNoteStore } from "../store/NoteStore";
import { getNotedownFolder } from "./DirectoryUtils";
import { readNotedownFolder } from "./ReadUtils";

import { v4 as uuidv4 } from "uuid";
import { NoteProps } from "../../types/Notes";

/**
 * creates a new note in the Notedown
 */
export const createNewNote = async () => {
  const noteName = `\\Note - ${useNoteStore.getState().notes.length + 1}.json`;

  const noteContents: NoteProps = {
    noteId: uuidv4(),
    title: `Note - ${useNoteStore.getState().notes.length + 1}`,
    content: "",
    createdAt: new Date().toString(),
  };

  writeToNote(noteName, JSON.stringify(noteContents));
};

export const writeToNote = async (noteName: string, contents: string) => {
  const folder = await getNotedownFolder();
  await writeTextFile(folder + `\\` + noteName, contents);
};

export const renameNote = async (noteName: string, newNoteName: string) => {
  const folder = await getNotedownFolder();
  await renameFile(
    folder + `\\` + noteName,
    folder + `\\` + newNoteName + ".json"
  ).then(() =>
    readNotedownFolder().then((notes) => {
      useActiveStore.getState().setActiveNoteTitle(newNoteName + ".json");
      useNoteStore.getState().updateNotes(notes);
    })
  );
};
