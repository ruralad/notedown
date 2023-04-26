import { create } from "zustand";

import { AppSettingsProps } from "../../types/Settings";

interface SettingsStoreProps {
  appSettings: AppSettingsProps;
  setAppSettings: (settings: AppSettingsProps) => void;
}

export const useSettingsStore = create<SettingsStoreProps>()((set) => ({
  appSettings: {
    lastOpened: "",
    notesCreated: 0,
    notesDeleted: 0,
    editorStyle: "code",
    isFullscreen: false,
  },
  setAppSettings: (settings) => set({ appSettings: settings }),
}));
