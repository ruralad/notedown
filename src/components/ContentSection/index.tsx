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
    <section className="w-full h-screen bg-gray-900 p-5 text-white">
      {!!activeNote && (
        <p
          title={UiStore.showDirectory ? `Hide Directory` : `Show Directory`}
          className="text-2xl hover:cursor-pointer"
          onClick={() => UiStore.setShowDirectory()}
        >
          {UiStore.showDirectory ? <>&larr;</> : <>&rarr;</>}
        </p>
      )}

      {!!editor && (
        <>
          <input
            className="outline-none bg-gray-900 text-3xl py-4"
            onChange={(e) => setHeading(e.target.value)}
            onBlur={updateHeading}
            value={heading}
          />
          <textarea
            className="h-full w-full p-2 outline-none bg-gray-900"
            onChange={(e) => setContents(e.target.value)}
            value={contents}
          />
        </>
      )}
    </section>
  );
};

export default ContentSection;
