import { useEffect, useState } from "react";
import { NoteProps } from "../../../types/Notes";

import { useActiveStore } from "../../store/NoteStore";
import { useUiStore } from "../../store/UiStore";

import { readNote } from "../../utils/ReadUtils";
import { renameNote, writeToNote } from "../../utils/WriteUtils";

const ContentSection: React.FC = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const activeNote = useActiveStore((state) => state.activeNote);
  const showDirectory = useUiStore((state) => state.showDirectory);

  const setActiveNote = useActiveStore((state) => state.setActiveNote);

  const [editor, toggleEditor] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

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

  useEffect(() => {
    countWordsAndChars();
  }, [contents]);

  const countWordsAndChars = () => {
    const words = contents.split(/\s|\r\n|\r|\n/); //matches whitespace and linebreaks(for all platforms)
    let wordCount = 0;
    words.forEach((word) => {
      if (word.trim() !== "" && word.trim().match(/[a-z]/i)) {
        wordCount++;
      }
    });
    setWordCount(wordCount);
    setCharCount(contents.length);
  };

  const updateTitle = () => {
    const updatedNote: NoteProps = { ...activeNote, title: title };
    writeToNote(activeNoteTitle, JSON.stringify(updatedNote));
    renameNote(activeNoteTitle, title);
  };

  return (
    <section
      className={
        "w-full h-full relative bg-zinc-900 p-14 text-gray-100 " +
        (showDirectory ? "rounded-tl-xl" : ``)
      }
    >
      <div className="absolute right-3 top-3 text-xs text-gray-400">
        words : {wordCount}, characters : {charCount}
      </div>
      {!!editor && (
        <div className="h-full relative select-text">
          <input
            className="outline-none bg-inherit text-3xl font-bold p-4 h-10"
            spellCheck={false}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={updateTitle}
            value={title}
          />
          <textarea
            className="h-3/4 overflow-y-scroll w-full p-4 outline-none bg-inherit resize-none text-gray-300 leading-relaxed"
            onChange={(e) => setContents(e.target.value)}
            value={contents}
          />
        </div>
      )}
    </section>
  );
};

export default ContentSection;
