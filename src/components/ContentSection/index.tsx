import { useEffect, useState } from "react";

import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";
import { useUiStore } from "../../store/UiStore";

import { readNote } from "../../utils/ReadUtils";
import { updateAppSettings } from "../../utils/StatsUtils";
import { renameNote, writeToNote } from "../../utils/WriteUtils";

import MainEditor from "./MainEditor";
import NoteSettings from "./NoteSettings";
import Title from "./Title";

import { NoteProps } from "../../../types/Notes";
import { AppSettingsProps } from "../../../types/Settings";

const ContentSection: React.FC = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const activeNote = useActiveStore((state) => state.activeNote);
  const allNotes = useNoteStore((state) => state.notes);
  const showDirectory = useUiStore((state) => state.showDirectory);
  const appSettings = useSettingsStore((state) => state.appSettings);

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
        const newSettings: AppSettingsProps = {
          ...appSettings,
          lastOpened: title + ".json",
        };
        updateAppSettings(newSettings);
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
          <Title
            setTitle={setTitle}
            title={title}
            updateTitle={updateTitle}
            titleError={titleError}
          />
          <MainEditor setContents={setContents} contents={contents} />
        </div>
      )}
    </section>
  );
};

export default ContentSection;
