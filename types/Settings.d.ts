export type AppSettingsProps = {
  lastOpened: string;
  notesCreated: number;
  notesDeleted: number;
  editorStyle: "code" | "markdown";
  isFullscreen: boolean;
  theme: "dark" | "light" | "system";
};
