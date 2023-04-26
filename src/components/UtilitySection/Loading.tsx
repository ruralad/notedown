import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";
import { readNotedownFolder } from "../../utils/ReadUtils";
import { readAppSettings } from "../../utils/StatsUtils";

const Loading = () => {
  const settingsStore = useSettingsStore();

  const updateNotes = useNoteStore((state) => state.updateNotes);

  useEffect(() => {
    readNotedownFolder().then((notes) => {
      updateNotes(notes);
    });
    readAppSettings().then((settings) => {
      settingsStore.setAppSettings(settings);
      if (settings.isFullscreen) appWindow.maximize();
      else appWindow.unmaximize();
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
