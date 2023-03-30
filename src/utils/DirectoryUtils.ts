import {
  BaseDirectory,
  createDir,
  exists,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";

export const getNotedownFolder = async () => {
  return (await documentDir()) + "Notedown";
};

/**
 * checks whether Notedown folder exists in the document directory. If not, a new folder is created
 *  */
export const verifyNotedownFolder = async () => {
  const folderExist: Boolean = await exists("Notedown", {
    dir: BaseDirectory.Document,
  });

  if (folderExist) {
    return;
  }
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
            `{opened : ""}`,
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
