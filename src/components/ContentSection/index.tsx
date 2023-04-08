import { useEffect, useState } from "react";
import { NoteProps } from "../../../types/Notes";

import { useActiveStore } from "../../store/NoteStore";

import { readNote } from "../../utils/ReadUtils";
import { renameNote, writeToNote } from "../../utils/WriteUtils";

const ContentSection: React.FC = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const activeNote = useActiveStore((state) => state.activeNote);

  const setActiveNote = useActiveStore((state) => state.setActiveNote);

  const [editor, toggleEditor] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  useEffect(() => {
    if (activeNoteTitle.length > 0) {
      readNote(activeNoteTitle).then((noteContents) => {
        setActiveNote(noteContents);
        setTitle(noteContents.title);
        setContents(noteContents.content);
        toggleEditor(true);
      });
    }
  }, [activeNoteTitle]);

  useEffect(() => {
    if (contents.length > 0) {
      const updatedNote: NoteProps = { ...activeNote, content: contents };
      writeToNote(activeNoteTitle, JSON.stringify(updatedNote));
    }
  }, [contents]);

  const updateTitle = () => {
    const updatedNote: NoteProps = { ...activeNote, title: title };
    writeToNote(activeNoteTitle, JSON.stringify(updatedNote));
    renameNote(activeNoteTitle, title);
  };

  return (
    <section className="w-full h-full relative bg-zinc-900 p-14 text-gray-100">
      {!!editor && (
        <div className="h-full relative">
          <input
            className="outline-none bg-inherit text-3xl font-bold py-4"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={updateTitle}
            value={title}
          />
          <textarea
            className="h-3/4 overflow-y-scroll w-full p-2 outline-none bg-inherit resize-none"
            onChange={(e) => setContents(e.target.value)}
            value={contents}
          />
        </div>
      )}
    </section>
  );
};

export default ContentSection;
