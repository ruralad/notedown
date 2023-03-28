import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { RxSquare } from "react-icons/rx";
const TitleBar = () => {
  const [fullscreen, setFullscreen] = useState<boolean>();

  useEffect(() => {
    appWindow.isMaximized().then((fullscreenStatus) => {
      setFullscreen(fullscreenStatus);
    });
  }, []);

  return (
    <div className="right-0 flex absolute">
      <div
        className="grid place-items-center w-8 h-8 hover:bg-slate-800 hover:cursor-pointer"
        onClick={() => appWindow.minimize()}
      >
        <AiOutlineMinus />
      </div>
      {fullscreen ? (
        <div
          className="grid place-items-center w-8 h-8 hover:bg-slate-800 hover:cursor-pointer"
          onClick={() => {
            appWindow.unmaximize();
            setFullscreen(!fullscreen);
          }}
        >
          {" "}
          <RxSquare />
        </div>
      ) : (
        <div
          className="grid place-items-center w-8 h-8 hover:bg-slate-800 hover:cursor-pointer"
          onClick={() => {
            appWindow.maximize();
            setFullscreen(!fullscreen);
          }}
        >
          {" "}
          <RxSquare />
        </div>
      )}

      <div
        className="grid place-items-center w-8 h-8 hover:bg-slate-800 hover:cursor-pointer"
        onClick={() => appWindow.close()}
      >
        {" "}
        <CgClose />
      </div>
    </div>
  );
};

export default TitleBar;
