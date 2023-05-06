import { create } from "zustand";

import { AppSettingsProps } from "../../types/Settings";

type SettingsStoreProps = {
  appSettings: AppSettingsProps;
  setAppSettings: (settings: AppSettingsProps) => void;
};

export const useSettingsStore = create<SettingsStoreProps>()((set) => ({
  appSettings: {
    lastOpened: "",
    notesCreated: 0,
    notesDeleted: 0,
    editorStyle: "code",
    isFullscreen: false,
    theme: "system",
  },
  setAppSettings: (settings) => set({ appSettings: settings }),
}));

type LoadingStoreProps = {
  isContentLoaded: boolean;
  setIsContentLoaded: (isLoaded: boolean) => void;
};

export const useLoadingStore = create<LoadingStoreProps>()((set) => ({
  isContentLoaded: false,
  setIsContentLoaded: (isLoaded) => set({ isContentLoaded: isLoaded }),
}));
