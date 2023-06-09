import {
  BaseDirectory,
  createDir,
  exists,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";

import { AppSettingsProps } from "../../types/Settings";

export const getNotedownFolder = async () => {
  return (await documentDir()) + "Notedown";
};

export const verifyNotedownFolder = async () => {
  const folderExist: Boolean = await exists("Notedown", {
    dir: BaseDirectory.Document,
  });
  if (folderExist) {
    return;
  }
  const appSettings: AppSettingsProps = {
    lastOpened: "",
    notesCreated: 0,
    notesDeleted: 0,
    editorStyle: "code",
    isFullscreen: false,
    theme: "system",
  };

  await createDir("Notedown", {
    dir: BaseDirectory.Document,
    recursive: true,
  })
    .then(async () => {
      await createDir("Notedown\\.settings", {
        dir: BaseDirectory.Document,
        recursive: true,
      })
        .then(async () => {
          await writeTextFile(
            "Notedown\\.settings\\app.json",
            JSON.stringify(appSettings),
            { dir: BaseDirectory.Document }
          ).then(() => {
            console.log("Folders initialized");
          });
        })
        .catch((e) => {
          console.log("Notedown folder created, settings creation error " + e);
        });
    })
    .catch((e) => {
      console.log(
        "Notedown folder doesn't exist, and couldn't create a new folder. Error Log - " +
          e
      );
    });
};
