import { FileEntry } from "@tauri-apps/api/fs";

import { useNoteStore } from "../../store/NoteStore";

import { readNotedownFolder } from "../../utils/ReadUtils";
import { createNewNote } from "../../utils/WriteUtils";

import { IoCreateOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const updateNotes = useNoteStore((state) => state.updateNotes);

  const createNote = async () => {
    createNewNote();
    readNotedownFolder().then((notes: FileEntry[]) => {
      updateNotes(notes);
    });
  };

  return (
    <div className="flex items-center w-full justify-between text-gray-200">
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
