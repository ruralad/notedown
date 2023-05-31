import { version } from "../../../package.json";

import { useUiStore } from "../../store/UiStore";

import ThemeChanger from "./ThemeHandler";

import AppWindowHandler from "./AppWindowHandler";
import FocusModeHandler from "./FocusModeHandler";

const TitleBar = () => {
  const { focusMode } = useUiStore();

  return (
    <div
      data-tauri-drag-region
      className="max-h-10 w-full text-muted-foreground flex justify-between items-center"
    >
      <div className="h-full flex items-center pl-3">
        {focusMode && (
          <span className="text-xs mr-2 pointer-events-none">
            Notedown v{version}
          </span>
        )}
        <FocusModeHandler />
        <ThemeChanger />
      </div>
      <AppWindowHandler />
    </div>
  );
};

export default TitleBar;
