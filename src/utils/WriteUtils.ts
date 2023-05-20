import { removeFile, renameFile, writeTextFile } from "@tauri-apps/api/fs";
import { v4 as uuidv4 } from "uuid";

import { useActiveNoteStore, useNoteStore } from "../store/NoteStore";

import { readNotedownFolder } from "./ReadUtils";

import { save } from "@tauri-apps/api/dialog";
import { NoteProps } from "../../types/Notes";
import { notedownFolderPath, pathSeperator } from "./PathUtils";

export const createNewNote = async (totalNotes: number) => {
  const noteName = `Note - ${useNoteStore.getState().notes.length + 1}.json`;

  const noteContents: NoteProps = {
    noteId: uuidv4(),
    noteNo: totalNotes + 1,
    title: `Note - ${useNoteStore.getState().notes.length + 1}`,
    content: "",
    createdAt: new Date().toString(),
  };
  writeToNote(noteName, JSON.stringify(noteContents));
  return noteName;
};

export const writeToNote = async (noteName: string, contents: string) => {
  await writeTextFile(notedownFolderPath + pathSeperator + noteName, contents);
};

export const renameNote = async (noteName: string, newNoteName: string) => {
  await renameFile(
    notedownFolderPath + pathSeperator + noteName,
    notedownFolderPath + pathSeperator + newNoteName + ".json"
  ).then(() =>
    readNotedownFolder().then((notes) => {
      useActiveNoteStore.getState().setActiveNoteTitle(newNoteName + ".json");
      useNoteStore.getState().updateNotes(notes);
    })
  );
};

export const deleteNote = async (noteName: string) => {
  useActiveNoteStore.getState().setActiveNoteTitle("");
  await removeFile(notedownFolderPath + pathSeperator + noteName).then(() => {
    readNotedownFolder().then((notes) => {
      useNoteStore.getState().updateNotes(notes);
    });
  });
};

export const exportNoteAsMarkdown = async (note: NoteProps) => {
  await save({
    filters: [
      {
        name: "Markdown",
        extensions: ["md"],
      },
    ],
    defaultPath: note.title,
  })
    .then(async (filePath) => {
      if (filePath != null) {
        await writeTextFile(filePath, `# ${note.title} \n ` + note.content)
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};
