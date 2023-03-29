import { FileEntry } from "@tauri-apps/api/fs";

import { useNoteStore } from "../../store/NoteStore";

import { verifyNotedownFolder } from "../../utils/DirectoryUtils";
import { readNotedownFolder } from "../../utils/ReadUtils";
import { createNewNote } from "../../utils/WriteUtils";

const Header: React.FC = () => {
  const updateNotes = useNoteStore((state) => state.updateNotes);

  const createNote = async () => {
    verifyNotedownFolder();
    createNewNote();
    readNotedownFolder().then((notes: FileEntry[]) => {
      updateNotes(notes);
    });
  };
  return (
    <div className="flex items-center w-full justify-between">
      <h1 className="text-2xl">All Notes</h1>
      <p
        onClick={createNote}
        className="py-1 px-2 rounded-md hover:bg-zinc-700 hover:cursor-pointer"
      >
        new
      </p>
    </div>
  );
};

export default Header;
