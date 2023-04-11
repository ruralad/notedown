import { useActiveStore, useNoteStore } from "../../store/NoteStore";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { createNewNote } from "../../utils/WriteUtils";

import { IoCreateOutline } from "react-icons/io5";
import { useSettingsStore } from "../../store/SettingsStore";
import { updateNotesCount } from "../../utils/StatsUtils";

const Header: React.FC = () => {
  const updateNotes = useNoteStore((state) => state.updateNotes);
  const appSettings = useSettingsStore((state) => state.appSettings);

  const setAppSettings = useSettingsStore((state) => state.setAppSettings);
  const setActiveNoteTitle = useActiveStore(
    (state) => state.setActiveNoteTitle
  );

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
