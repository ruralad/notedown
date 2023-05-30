import { ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveNoteStore } from "../../../../store/NoteStore";
import { copyToClipboard } from "../../../../utils/ReadUtils";

const CopyToClipboard = () => {
  const { activeNoteTitle } = useActiveNoteStore();

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copiedToClipboard) setCopiedToClipboard(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copiedToClipboard]);

  const handleCopyToClipboard = async () => {
    setCopiedToClipboard(true);
    copyToClipboard(activeNoteTitle);
  };

  return (
    <>
      {!!copiedToClipboard ? (
        <span className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120.2 120.2"
            className="w-[15px]"
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
          Copy To Clipboard
        </span>
      ) : (
        <span
          onClick={handleCopyToClipboard}
          className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
        >
          <ClipboardIcon size={15} /> Copy To Clipboard
        </span>
      )}
    </>
  );
};

export default CopyToClipboard;
