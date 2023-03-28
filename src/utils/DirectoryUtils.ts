import { BaseDirectory, createDir, exists } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";

export const NotedownFolder = (await documentDir()) + "Notedown";

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
      console.log(
        "Notedown folder doesn't exist, created it at " + (await documentDir())
      );
    })
    .catch((e) => {
      console.log(
        "Notedown folder doesn't exist, and couldn't create a new folder. Error Log - " +
          e
      );
    });
};
