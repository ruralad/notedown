import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import { version } from "../../../package.json";

import { useLoadingStore, useSettingsStore } from "../../store/SettingsStore";
import { useUiStore } from "../../store/UiStore";

import { updateAppSettings } from "../../utils/StatsUtils";

import ThemeChanger from "./ThemeHandler";

import {
  CircleDotIcon,
  MinusIcon,
  PlusCircleIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";

import { AppSettingsProps } from "../../../types/Settings";

const TitleBar = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const UiStore = useUiStore();
  const settingsStore = useSettingsStore();
  const loadingStore = useLoadingStore();

  //app starts minimized by default, check user settings to maximize or not
  useEffect(() => {
    if (loadingStore.isContentLoaded)
      setFullscreen(settingsStore.appSettings.isFullscreen);
  }, [settingsStore.appSettings.isFullscreen]);

  const handleUnMaximize = async () => {
    appWindow.unmaximize();
    const newSettings: AppSettingsProps = {
      ...settingsStore.appSettings,
      isFullscreen: false,
    };
    settingsStore.setAppSettings(newSettings);
    setFullscreen(false);
  };

  const handleMaximize = async () => {
    appWindow.maximize();
    const newSettings: AppSettingsProps = {
      ...settingsStore.appSettings,
      isFullscreen: true,
    };
    settingsStore.setAppSettings(newSettings);
    updateAppSettings(newSettings);
    setFullscreen(true);
  };

  return (
    <div
      data-tauri-drag-region
      className="max-h-10 w-full text-muted-foreground flex justify-between items-center"
    >
      <div className="h-full flex items-center pl-3">
        {UiStore.focusMode && (
          <span className="text-xs mr-2 pointer-events-none">
            Notedown v{version}
          </span>
        )}
        <span
          className="grid place-items-center w-8 h-8 p-2 rounded-lg hover:bg-accent hover:text-primary"
          onClick={() => UiStore.setFocusMode()}
          title={
            UiStore.focusMode
              ? "Switch to Focus Mode"
              : "Switch to Default Mode"
          }
        >
          {UiStore.focusMode ? (
            <CircleDotIcon size={16} />
          ) : (
            <PlusCircleIcon size={16} />
          )}
        </span>
        <ThemeChanger />
      </div>
      <div className="flex h-full">
        <div
          className="grid place-items-center w-10 h-full hover:bg-accent hover:text-primary"
          onClick={() => appWindow.minimize()}
        >
          <MinusIcon size={16} />
        </div>
        <div
          className="grid place-items-center w-10 h-full hover:bg-accent hover:text-primary"
          onClick={!!fullscreen ? handleUnMaximize : handleMaximize}
        >
          <SquareIcon size={13} />
        </div>
        <div
          className="grid place-items-center w-10 h-full hover:bg-red-600 hover:text-primary"
          onClick={() => appWindow.close()}
        >
          {" "}
          <XIcon size={16} />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
