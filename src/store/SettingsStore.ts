import { create } from "zustand";
import { AppSettingsProps } from "../../types/Notes";

interface SettingsStoreProps {
  appSettings: AppSettingsProps;
  setAppSettings: (settings: AppSettingsProps) => void;
}

export const useSettingsStore = create<SettingsStoreProps>()((set) => ({
  appSettings: {
    lastOpened: "",
    notesCreated: 0,
  },
  setAppSettings: (settings) => set({ appSettings: settings }),
}));
