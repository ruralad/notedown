import { useEffect, useState } from "react";

import { useActiveNoteStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";
import { useUiStore } from "../../store/UiStore";

import { readNote } from "../../utils/ReadUtils";
import { updateAppSettings } from "../../utils/StatsUtils";
import { renameNote, writeToNote } from "../../utils/WriteUtils";

import MainEditor from "./MainEditor";
import NoteDetails from "./NoteUtils/NoteDetails";
import NoteSettings from "./NoteUtils/NoteSettings";
import Title from "./Title";

import { NoteProps } from "../../../types/Notes";
import { AppSettingsProps } from "../../../types/Settings";

const ContentSection: React.FC = () => {
  const { activeNoteTitle, activeNote, setActiveNote } = useActiveNoteStore();
  const { notes } = useNoteStore();
  const { focusMode } = useUiStore();
  const { appSettings } = useSettingsStore();

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
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
    }, 3000);
    return () => clearTimeout(errorTimeout);
  }, [titleError]);

  const updateTitle = () => {
    if (
      title.length < 1 ||
      (notes
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
        "w-full h-full relative bg-card border-l border-t px-14 py-14 " +
        (focusMode ? "rounded-tl-xl" : ``)
      }
    >
      <NoteSettings />
      {!!activeNoteTitle && (
        <>
          <NoteDetails contents={contents} />
          <div className="h-full relative select-text">
            <Title
              setTitle={setTitle}
              title={title}
              updateTitle={updateTitle}
              titleError={titleError}
            />
            <MainEditor setContents={setContents} contents={contents} />
          </div>
        </>
      )}
    </section>
  );
};

export default ContentSection;
