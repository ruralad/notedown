import { useEffect } from "react";

import { useLoadingStore, useSettingsStore } from "../../store/SettingsStore";

import { toggleTheme, useSystemTheme } from "../../utils/AppUtils";
import { updateAppSettings } from "../../utils/StatsUtils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import { AppSettingsProps } from "../../../types/Settings";

const ThemeChanger = () => {
  const { appSettings, setAppSettings } = useSettingsStore();
  const { isContentLoaded } = useLoadingStore();

  const prefersDarkMode = useSystemTheme();

  //detect system theme changes
  useEffect(() => {
    if (isContentLoaded && appSettings.theme === "system")
      switchTheme("system");
  }, [prefersDarkMode]);

  const switchTheme = (theme: "dark" | "light" | "system") => {
    let newSettings: AppSettingsProps;
    toggleTheme(theme);
    newSettings = { ...appSettings, theme };
    setAppSettings(newSettings);
    updateAppSettings(newSettings);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="grid place-items-center w-8 h-8 p-2 rounded-lg hover:bg-accent hover:text-primary hover:cursor-default">
                {appSettings.theme === "dark" && <MoonIcon size={16} />}
                {appSettings.theme === "light" && <SunIcon size={16} />}
                {appSettings.theme === "system" && <LaptopIcon size={16} />}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col text-sm p-2">
        <span
          className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
          onClick={() => switchTheme("light")}
        >
          <SunIcon size={16} />
          Light
        </span>
        <span
          className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
          onClick={() => switchTheme("dark")}
        >
          <MoonIcon size={16} />
          Dark
        </span>
        <span
          className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
          onClick={() => switchTheme("system")}
        >
          <LaptopIcon size={16} />
          System
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeChanger;
