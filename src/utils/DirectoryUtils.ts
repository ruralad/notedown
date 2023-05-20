import {
  BaseDirectory,
  createDir,
  exists,
  writeTextFile,
} from "@tauri-apps/api/fs";

import { appJsonFilePath, settingsFolderPath } from "./PathUtils";

import { AppSettingsProps } from "../../types/Settings";

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
      await createDir(settingsFolderPath, {
        dir: BaseDirectory.Document,
        recursive: true,
      })
        .then(async () => {
          await writeTextFile(appJsonFilePath, JSON.stringify(appSettings), {
            dir: BaseDirectory.Document,
          }).then(() => {
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
