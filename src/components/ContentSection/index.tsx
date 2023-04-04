import { useEffect, useState } from "react";

import { useActiveStore } from "../../store/NoteStore";
import { useUiStore } from "../../store/UiStore";

import { readNote } from "../../utils/ReadUtils";
import { renameNote, writeToNote } from "../../utils/WriteUtils";

const ContentSection: React.FC = () => {
  const activeNote = useActiveStore((state) => state.activeNote);
  const UiStore = useUiStore();

  const [editor, toggleEditor] = useState<boolean>(false);

  const [heading, setHeading] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  useEffect(() => {
    if (activeNote.length > 0) {
      readNote(activeNote).then((noteContents) => {
        setHeading(noteContents.split("\\n")[0]);
        setContents(noteContents.split("\\n")[1]);
        toggleEditor(true);
      });
    }
  }, [activeNote]);

  useEffect(() => {
    if (contents.length > 0)
      writeToNote(activeNote, heading + "\\n" + contents);
  }, [contents]);

  const updateHeading = () => {
    if (activeNote.split(".")[0] != heading) {
      writeToNote(activeNote, heading + "\\n" + contents).then(() => {
        renameNote(activeNote, heading + ".txt").then(() => {});
      });
    }
  };

  return (
    <section className="w-full h-full relative bg-zinc-900 p-5 text-white">
      {!!editor && (
        <div className="h-full relative">
          <input
            className="outline-none bg-zinc-900 text-3xl font-medium py-4"
            onChange={(e) => setHeading(e.target.value)}
            onBlur={updateHeading}
            value={heading}
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
