import { FileEntry } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { readNotedownFolder } from "../../utils/ReadUtils";

const Notes: React.FC = () => {
  const allNotes = useNoteStore((state) => state.notes);
  const updateNotes = useNoteStore((state) => state.updateNotes);

  const setActiveNote = useActiveStore((state) => state.setActiveNote);

  useEffect(() => {
    readNotedownFolder().then((notes: FileEntry[]) => {
      updateNotes(notes);
    });
  }, []);

  return (
    <div className="mt-10 ">
      {allNotes &&
        allNotes.map((v, i) => {
          return (
            <p
              className="p-1 m-1 hover:bg-gray-100 hover:cursor-pointer rounded-md "
              key={v.name}
              onClick={() => setActiveNote(v.name as string)}
            >
              {v.name?.split(".")[0]}
            </p>
          );
        })}
    </div>
  );
};

export default Notes;
