import { documentDir, sep } from "@tauri-apps/api/path";

export const getNotedownFolderPath = async () => {
  return (await documentDir()) + "Notedown";
};

export const getSettingsFolderPath = async () => {
  return (await getNotedownFolderPath()) + sep + ".settings";
};

export const getAppJsonFilePath = async () => {
  return (await getSettingsFolderPath()) + sep + "app.json";
};
