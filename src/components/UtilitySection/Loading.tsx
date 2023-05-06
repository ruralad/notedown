import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

import { useNoteStore } from "../../store/NoteStore";
import { useLoadingStore, useSettingsStore } from "../../store/SettingsStore";
import { toggleTheme } from "../../utils/AppUtils";
import { verifyNotedownFolder } from "../../utils/DirectoryUtils";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { readAppSettings } from "../../utils/StatsUtils";

type LoadingProps = {
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const Loading: React.FC<LoadingProps> = (props) => {
  const settingsStore = useSettingsStore();
  const loadingStore = useLoadingStore();
  const updateNotes = useNoteStore((state) => state.updateNotes);

  //1 second delay before showing content
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (loadingStore.isContentLoaded) props.setShowContent(true);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [loadingStore.isContentLoaded]);

  // Load and verify data
  useEffect(() => {
    verifyNotedownFolder().then(() => {
      readNotedownFolder().then((notes) => {
        updateNotes(notes);
      });
      readAppSettings().then((settings) => {
        settingsStore.setAppSettings(settings);
        if (settings.isFullscreen) appWindow.maximize();
        else appWindow.unmaximize();
        toggleTheme(settings.theme);
        loadingStore.setIsContentLoaded(true);
      });
    });
  }, []);

  return (
    <div className="absolute grid place-items-center w-screen h-screen z-999999">
      <div className="grid place-items-center">
        <div className="loading"></div>
        <span className="mt-2 text-sm">loading your workspace</span>
      </div>
    </div>
  );
};

export default Loading;
