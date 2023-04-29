import * as Dialog from "@radix-ui/react-dialog";

import { useActiveStore } from "../../../../store/NoteStore";
import { useSettingsStore } from "../../../../store/SettingsStore";

import {
  updateAppSettings,
  updateDeletedNotesCount,
} from "../../../../utils/StatsUtils";
import { deleteNote } from "../../../../utils/WriteUtils";

import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsMarkdown } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { TbClipboardCopy } from "react-icons/tb";
import { AppSettingsProps } from "../../../../../types/Settings";
import { copyToClipboard } from "../../../../utils/ReadUtils";

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
      <div className="absolute z-999 flex gap-3 right-3 top-3 text-gray-400">
        {!!(appSettings.editorStyle === "markdown") ? (
          <FiEdit3
            className="hover:cursor-pointer"
            title="Switch to Editor"
            onClick={() => handleEditorStyle("code")}
          />
        ) : (
          <BsMarkdown
            className="hover:cursor-pointer"
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
              stroke="#ffffff"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
        ) : (
          <TbClipboardCopy
            className="hover:cursor-pointer"
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

const DeleteNote = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const appSettings = useSettingsStore((state) => state.appSettings);

  const setAppSettings = useSettingsStore((state) => state.setAppSettings);

  const removeNote = () => {
    deleteNote(activeNoteTitle).then(() => {
      updateDeletedNotesCount(appSettings).then((newSettings) => {
        setAppSettings(newSettings);
      });
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <AiOutlineDelete
          className="hover:text-red-600 hover:cursor-pointer"
          title="Delete Note"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-800 border border-zinc-500 p-[25px] focus:outline-none">
          <Dialog.Title className="m-0 font-bold">
            Delete {activeNoteTitle.split(".json")[0]}
          </Dialog.Title>
          <Dialog.Description className="my-5 text-sm text-gray-300 leading-normal">
            Are you sure you want to delete this note? <br />
            This will{" "}
            <span className=" bg-zinc-600 px-1 rounded">permanently</span>{" "}
            remove the file from the system!
          </Dialog.Description>

          <div className="flex justify-end text-sm">
            <Dialog.Close asChild>
              <button
                className="px-2 py-1 rounded bg-red-600 mr-3 outline-none"
                onClick={removeNote}
              >
                Delete
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="px-2 py-1 rounded bg-zinc-700 outline-none">
                Cancel
              </button>
            </Dialog.Close>
          </div>
          {/* <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            ></button>
          </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NoteSettings;
