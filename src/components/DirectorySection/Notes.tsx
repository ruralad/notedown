import { FileEntry } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { readNotedownFolder } from "../../utils/ReadUtils";

const Notes: React.FC = () => {
  const allNotes = useNoteStore((state) => state.notes);
  const updateNotes = useNoteStore((state) => state.updateNotes);

  const setActiveNoteTitle = useActiveStore(
    (state) => state.setActiveNoteTitle
  );

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
              className="p-1 my-2 hover:bg-zinc-900 hover:cursor-pointer rounded-sm "
              key={v.name}
              onClick={() => setActiveNoteTitle(v.name as string)}
            >
              {v.name?.split(".")[0]}
            </p>
          );
        })}
    </div>
  );
};

export default Notes;
