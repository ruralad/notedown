import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BiSquare } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { RiFocusFill } from "react-icons/ri";
import { TbFocus } from "react-icons/tb";
import { useUiStore } from "../../store/UiStore";

import { version } from "../../../package.json";

const TitleBar = () => {
  const [fullscreen, setFullscreen] = useState<boolean>();
  const UiStore = useUiStore();

  useEffect(() => {
    appWindow.isMaximized().then((fullscreenStatus) => {
      setFullscreen(fullscreenStatus);
    });
  }, []);

  return (
    <div
      data-tauri-drag-region
      className="max-h-10 w-full text-gray-400 flex justify-between items-center"
    >
      <div className="h-full flex items-center pl-3">
        {UiStore.showDirectory && (
          <span className="text-xs mr-2 pointer-events-none">
            Notedown v{version}
          </span>
        )}
        <div
          className="grid place-items-center w-8 h-8 p-2 rounded-lg hover:bg-zinc-600 hover:text-white"
          onClick={() => UiStore.setShowDirectory()}
          title={
            UiStore.showDirectory
              ? "Switch to Focus Mode"
              : "Switch to Normal Mode"
          }
        >
          {UiStore.showDirectory ? (
            <TbFocus size={16} />
          ) : (
            <RiFocusFill size={16} />
          )}
        </div>
      </div>
      <div className="flex h-full">
        <div
          className="grid place-items-center w-10 h-full hover:bg-zinc-600 hover:text-white"
          onClick={() => appWindow.minimize()}
        >
          <AiOutlineMinus />
        </div>
        {!!fullscreen ? (
          <div
            className="grid place-items-center w-10 h-full hover:bg-zinc-600 hover:text-white"
            onClick={() => {
              appWindow.unmaximize();
              setFullscreen(!fullscreen);
            }}
          >
            <BiSquare size={13} />
          </div>
        ) : (
          <div
            className="grid place-items-center w-10 h-full hover:bg-zinc-600 hover:text-white"
            onClick={() => {
              appWindow.maximize();
              setFullscreen(!fullscreen);
            }}
          >
            {" "}
            <BiSquare size={13} />
          </div>
        )}

        <div
          className="grid place-items-center w-10 h-full hover:bg-red-600 hover:text-white"
          onClick={() => appWindow.close()}
        >
          {" "}
          <CgClose size={15} />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
