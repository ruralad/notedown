import { type } from "@tauri-apps/api/os";
import { documentDir } from "@tauri-apps/api/path";

export const getPathSeperator = async () => {
  const osType = (await type()).toString();
  if (osType === "Windows_NT") {
    return "\\";
  } else {
    return "/";
  }
};

export const notedownFolderPath: string = (await documentDir()) + "Notedown";

export const pathSeperator: string = await getPathSeperator();

export const settingsFolderPath: string =
  notedownFolderPath + (await getPathSeperator()) + ".settings";

export const appJsonFilePath: string =
  settingsFolderPath + (await getPathSeperator()) + "app.json";
