import { useEffect, useState } from "react";

import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { useUiStore } from "../../store/UiStore";

import { readNote } from "../../utils/ReadUtils";
import { renameNote, writeToNote } from "../../utils/WriteUtils";

import NoteSettings from "./NoteSettings";

import { NoteProps } from "../../../types/Notes";

const ContentSection: React.FC = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const activeNote = useActiveStore((state) => state.activeNote);
  const allNotes = useNoteStore((state) => state.notes);
  const showDirectory = useUiStore((state) => state.showDirectory);

  const setActiveNote = useActiveStore((state) => state.setActiveNote);

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

  const [titleError, setTitleError] = useState<boolean>(false);

  useEffect(() => {
    if (activeNoteTitle.length > 0) {
      readNote(activeNoteTitle).then((noteContents) => {
        setActiveNote(noteContents);
        setTitle(noteContents.title);
        setContents(noteContents.content);
      });
    } else {
      setTitle("");
      setContents("");
    }
  }, [activeNoteTitle]);

  useEffect(() => {
    countWordsAndChars();
    if (contents.length > 0) {
      const updatedNote: NoteProps = { ...activeNote, content: contents };
      writeToNote(activeNoteTitle, JSON.stringify(updatedNote)).then(() =>
        setActiveNote(updatedNote)
      );
    }
  }, [contents]);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (titleError) setTitleError(false);
    }, 5000);
    return () => clearTimeout(errorTimeout);
  }, [titleError]);

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
    if (
      title.length < 1 ||
      (allNotes
        .map((file) => file.name?.toLowerCase())
        .includes(title.trim().toLowerCase() + ".json") &&
        title.trim() != activeNoteTitle.split(".json")[0])
    ) {
      setTitleError(true);
      return;
    } else {
      const updatedNote: NoteProps = { ...activeNote, title: title.trim() };
      writeToNote(activeNoteTitle, JSON.stringify(updatedNote)).then(() => {
        renameNote(activeNoteTitle, title);
        setActiveNote(updatedNote);
      });
    }
  };

  return (
    <section
      className={
        "w-full h-full relative bg-zinc-900 px-14 py-14 text-gray-100 " +
        (showDirectory ? "rounded-tl-xl" : ``)
      }
    >
      <NoteSettings />
      {activeNoteTitle && (
        <span className="absolute right-3 bottom-3 text-xs text-gray-400">
          words : {wordCount}, characters : {charCount}
        </span>
      )}
      {!!activeNoteTitle && (
        <div className="h-full relative select-text">
          <input
            className={
              "outline-none bg-inherit text-3xl font-bold p-4 pb-6 h-10 " +
              (titleError ? `border-b-2 border-b-red-600` : ``)
            }
            spellCheck={false}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={updateTitle}
            value={title}
          />
          <textarea
            className="h-5/6 overflow-y-scroll w-full p-4 outline-none bg-inherit resize-none text-gray-300 leading-relaxed"
            onChange={(e) => setContents(e.target.value)}
            spellCheck={false}
            value={contents}
          />
        </div>
      )}
    </section>
  );
};

export default ContentSection;
