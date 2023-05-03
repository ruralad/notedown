import { useActiveStore } from "../../../../store/NoteStore";
import { useSettingsStore } from "../../../../store/SettingsStore";

import { updateAppSettings } from "../../../../utils/StatsUtils";

import { useEffect, useState } from "react";
import { BsMarkdown } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { TbClipboardCopy } from "react-icons/tb";
import { AppSettingsProps } from "../../../../../types/Settings";
import { copyToClipboard } from "../../../../utils/ReadUtils";
import DeleteNote from "../../../UtilitySection/DeleteNote";

const NoteSettings = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const appSettings = useSettingsStore((state) => state.appSettings);

  const setAppSettings = useSettingsStore((state) => state.setAppSettings);

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copiedToClipboard) setCopiedToClipboard(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copiedToClipboard]);

  const handleEditorStyle = (style: "code" | "markdown") => {
    const newSettings: AppSettingsProps = {
      ...appSettings,
      editorStyle: style,
    };
    updateAppSettings(newSettings);
    setAppSettings(newSettings);
  };

  const handleCopyToClipboard = async () => {
    setCopiedToClipboard(true);
    copyToClipboard(activeNoteTitle);
  };

  if (activeNoteTitle.length > 0) {
    return (
      <div className="absolute z-999 flex gap-3 right-3 top-3 text-muted-foreground">
        {!!(appSettings.editorStyle === "markdown") ? (
          <FiEdit3
            className="hover:cursor-pointer mt-[1px] hover:text-primary"
            title="Switch to Editor"
            onClick={() => handleEditorStyle("code")}
          />
        ) : (
          <BsMarkdown
            className="hover:cursor-pointer mt-[1px] hover:text-primary"
            title="View as Markdown"
            onClick={() => handleEditorStyle("markdown")}
          />
        )}
        {!!copiedToClipboard ? (
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120.2 120.2"
            className="w-4"
          >
            <polyline
              className="checkmark"
              fill="none"
              stroke="#00FF00"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
        ) : (
          <TbClipboardCopy
            className="hover:cursor-pointer hover:text-primary"
            title="Copy to Clipboard"
            onClick={handleCopyToClipboard}
          />
        )}
        {/* <BiExport
          className="hover:cursor-pointer"
          title="Export as Markdown [COMING on 0.5]"
        /> */}
        <DeleteNote />
      </div>
    );
  }
  return <></>;
};

export default NoteSettings;
