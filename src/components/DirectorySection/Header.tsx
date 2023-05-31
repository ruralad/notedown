import { useActiveNoteStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { updateNotesCount } from "../../utils/StatsUtils";
import { createNewNote } from "../../utils/WriteUtils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import { PlusIcon } from "lucide-react";

const Header: React.FC = () => {
  const { updateNotes } = useNoteStore();
  const { appSettings, setAppSettings } = useSettingsStore();

  const { setActiveNoteTitle } = useActiveNoteStore();

  const createNote = async () => {
    createNewNote(appSettings.notesCreated).then(async (noteName) => {
      await updateNotesCount(appSettings).then((newsettings) => {
        setAppSettings(newsettings);
      });
      setActiveNoteTitle(noteName);
    });
    readNotedownFolder().then((notes) => {
      updateNotes(notes);
    });
  };

  return (
    <div className="flex items-center w-full px-4 justify-between">
      <h1 className="text-2xl">All Notes</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span
              onClick={createNote}
              className="block hover:bg-accent p-1 rounded-lg hover:cursor-pointer hover:text-primary"
            >
              <PlusIcon size={15} />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Note</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Header;
