import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import { useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { readAppSettings } from "../../utils/StatsUtils";

type LoadingProps = {
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const Loading: React.FC<LoadingProps> = (props) => {
  const settingsStore = useSettingsStore();

  const updateNotes = useNoteStore((state) => state.updateNotes);

  const [contentLoaded, setContentLoaded] = useState(false);

  //1 second delay before showing content
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (contentLoaded) props.setShowContent(true);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [contentLoaded]);

  // Load and verify data
  useEffect(() => {
    readNotedownFolder().then((notes) => {
      updateNotes(notes);
    });
    readAppSettings().then((settings) => {
      settingsStore.setAppSettings(settings);
      if (settings.isFullscreen) appWindow.maximize();
      else appWindow.unmaximize();
      setContentLoaded(true);
    });
  }, []);

  return (
    <div className="absolute grid place-items-center bg-zinc-800 w-screen text-white h-screen z-999999">
      <div className="grid place-items-center">
        <div className="loading"></div>
        <span className="mt-2 text-gray-400 text-sm">
          loading your workspace
        </span>
      </div>
    </div>
  );
};

export default Loading;
