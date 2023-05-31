import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import { updateAppSettings } from "../../utils/StatsUtils";

import { useLoadingStore, useSettingsStore } from "../../store/SettingsStore";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import { MinusIcon, SquareIcon, XIcon } from "lucide-react";

import { AppSettingsProps } from "../../../types/Settings";

const AppWindowHandler = () => {
  const { appSettings, setAppSettings } = useSettingsStore();
  const { isContentLoaded } = useLoadingStore();

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  //app starts minimized by default, check user settings to maximize or not
  useEffect(() => {
    if (isContentLoaded) setFullscreen(appSettings.isFullscreen);
  }, [appSettings.isFullscreen]);

  const handleUnMaximize = async () => {
    appWindow.unmaximize();
    const newSettings: AppSettingsProps = {
      ...appSettings,
      isFullscreen: false,
    };
    setAppSettings(newSettings);
    setFullscreen(false);
  };

  const handleMaximize = async () => {
    appWindow.maximize();
    const newSettings: AppSettingsProps = {
      ...appSettings,
      isFullscreen: true,
    };
    setAppSettings(newSettings);
    updateAppSettings(newSettings);
    setFullscreen(true);
  };
  return (
    <div className="flex h-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="grid place-items-center w-10 h-full hover:bg-accent hover:text-primary"
              onClick={() => appWindow.minimize()}
            >
              <MinusIcon size={16} />
            </span>
          </TooltipTrigger>
          <TooltipContent>Minimize Window</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="grid place-items-center w-10 h-full hover:bg-accent hover:text-primary"
              onClick={!!fullscreen ? handleUnMaximize : handleMaximize}
            >
              <SquareIcon size={13} />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {!!fullscreen ? "Unmaximize" : "Maximize"} Window
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="grid place-items-center w-10 h-full hover:bg-red-600 hover:text-primary"
              onClick={() => appWindow.close()}
            >
              <XIcon size={16} />
            </span>
          </TooltipTrigger>
          <TooltipContent>Close App</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AppWindowHandler;
