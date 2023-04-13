import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { AppSettingsProps } from "../../types/Notes";
import { getNotedownFolder } from "./DirectoryUtils";

export const readAppSettings = async () => {
  const folder = await getNotedownFolder();
  const contents = await readTextFile(folder + `\\.settings\\app.json`);
  const json: AppSettingsProps = JSON.parse(contents);
  return json;
};

export const updateNotesCount = async (currentSettings: AppSettingsProps) => {
  const newSettings: AppSettingsProps = {
    ...currentSettings,
    notesCreated: currentSettings.notesCreated + 1,
  };
  updateAppSettings(newSettings);
  return newSettings;
};

export const updateDeletedNotesCount = async (
  currentSettings: AppSettingsProps
) => {
  const newSettings: AppSettingsProps = {
    ...currentSettings,
    notesDeleted: currentSettings.notesDeleted + 1,
    lastOpened: "",
  };
  updateAppSettings(newSettings);
  return newSettings;
};

export const updateAppSettings = async (newSettings: AppSettingsProps) => {
  const folder = await getNotedownFolder();
  await writeTextFile(
    folder + `\\.settings\\app.json`,
    JSON.stringify(newSettings)
  );
};
