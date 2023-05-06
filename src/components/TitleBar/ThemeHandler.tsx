import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";
import { AppSettingsProps } from "../../../types/Settings";
import { useSettingsStore } from "../../store/SettingsStore";
import { toggleTheme, useSystemTheme } from "../../utils/AppUtils";
import { updateAppSettings } from "../../utils/StatsUtils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ThemeChanger = () => {
  const settingsStore = useSettingsStore();
  const prefersDarkMode = useSystemTheme();
  //detect system theme changes
  useEffect(() => {
    if (settingsStore.appSettings.theme === "system") switchTheme("system");
  }, [prefersDarkMode]);
  const switchTheme = (theme: "dark" | "light" | "system") => {
    let newSettings: AppSettingsProps;
    toggleTheme(theme);
    newSettings = { ...settingsStore.appSettings, theme };
    settingsStore.setAppSettings(newSettings);
    updateAppSettings(newSettings);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <span
          className="grid place-items-center w-8 h-8 p-2 rounded-lg hover:bg-accent hover:text-primary hover:cursor-default"
          title="Change Theme"
        >
          {settingsStore.appSettings.theme === "dark" && <MoonIcon size={16} />}
          {settingsStore.appSettings.theme === "light" && <SunIcon size={16} />}
          {settingsStore.appSettings.theme === "system" && (
            <LaptopIcon size={16} />
          )}
        </span>
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
