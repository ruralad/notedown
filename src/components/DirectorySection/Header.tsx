import { useActiveNoteStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { updateNotesCount } from "../../utils/StatsUtils";
import { createNewNote } from "../../utils/WriteUtils";

import { PlusIcon } from "lucide-react";

const Header: React.FC = () => {
  const updateNotes = useNoteStore((state) => state.updateNotes);
  const settings = useSettingsStore();

  const setActiveNoteTitle = useActiveNoteStore(
    (state) => state.setActiveNoteTitle
  );

  const createNote = async () => {
    createNewNote(settings.appSettings.notesCreated).then(async (noteName) => {
      await updateNotesCount(settings.appSettings).then((newsettings) => {
        settings.setAppSettings(newsettings);
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
      <PlusIcon
        size={16}
        onClick={createNote}
        className="hover:cursor-pointer"
      />
    </div>
  );
};

export default Header;
