import { useActiveNoteStore } from "../../../../store/NoteStore";

import DeleteNote from "./DeleteNote";
import ExportNote from "./ExportNote";

import { MoreVerticalIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";

import CopyToClipboard from "./CopyToClipboard";
import PreviewAsMD from "./PreviewAsMD";

const NoteSettings = () => {
  const { activeNoteTitle } = useActiveNoteStore();

  if (activeNoteTitle.length > 0) {
    return (
      <div className="absolute z-999 flex gap-3 right-3 top-3 text-muted-foreground">
        <Popover>
          <PopoverTrigger>
            <span className="block hover:bg-accent p-1 rounded hover:cursor-pointer hover:text-primary">
              <MoreVerticalIcon size={15} />
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-fit text-sm">
            <PreviewAsMD />
            <CopyToClipboard />
            <ExportNote />
            <DeleteNote />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
  return <></>;
};

export default NoteSettings;
