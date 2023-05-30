import { useEffect, useState } from "react";

import { useActiveNoteStore } from "../../../../store/NoteStore";

import { exportNoteAsMarkdown } from "../../../../utils/WriteUtils";

import { DownloadIcon } from "lucide-react";

const ExportNote = () => {
  const { activeNote } = useActiveNoteStore();

  const [exported, setExported] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (exported) setExported(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [exported]);

  const handleExport = async () => {
    await exportNoteAsMarkdown(activeNote).then(() => setExported(true));
  };
  return (
    <span
      onClick={handleExport}
      className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
    >
      {!!exported ? (
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
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
      ) : (
        <DownloadIcon size={15} />
      )}
      <span>Export</span>
    </span>
  );
};

export default ExportNote;
``;
