import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";

import { AppSettingsProps } from "../../types/Settings";
import { appJsonFilePath, notedownFolderPath } from "./PathUtils";

export const readAppSettings = async () => {
  const contents = await readTextFile(
    notedownFolderPath + `\\.settings\\app.json`
  );
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
  await writeTextFile(appJsonFilePath, JSON.stringify(newSettings));
};

export const getLineAndColumn = (
  e:
    | React.KeyboardEvent<HTMLTextAreaElement>
    | React.MouseEvent<HTMLTextAreaElement, MouseEvent>
) => {
  const textLines = e.currentTarget.value
    .substring(0, e.currentTarget.selectionStart)
    .split("\n");
  const line = textLines.length;
  const column = textLines[textLines.length - 1].length;
  return { line, column };
};
