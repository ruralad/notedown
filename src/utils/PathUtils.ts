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
export const getNotedownFolderPath = async () => {
  return (await documentDir()) + "Notedown";
};

export const getSettingsFolderPath = async () => {
  return (
    (await getNotedownFolderPath()) + (await getPathSeperator()) + ".settings"
  );
};

export const getAppJsonFilePath = async () => {
  return (
    (await getSettingsFolderPath()) + (await getPathSeperator()) + "app.json"
  );
};
