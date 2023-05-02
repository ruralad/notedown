import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { updateNotesCount } from "../../utils/StatsUtils";
import { createNewNote } from "../../utils/WriteUtils";

import { IoCreateOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const updateNotes = useNoteStore((state) => state.updateNotes);
  const settings = useSettingsStore();

  const setActiveNoteTitle = useActiveStore(
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
    <div className="flex items-center w-full px-4 justify-between text-gray-200">
      <h1 className="text-2xl">All Notes</h1>
      <IoCreateOutline
        onClick={createNote}
        title="Create a new note"
        className="text-xl hover:text-white hover:cursor-pointer"
      />
    </div>
  );
};

export default Header;
