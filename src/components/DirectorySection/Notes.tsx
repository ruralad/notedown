import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { AppSettingsProps } from "../../../types/Notes";
import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";
import { readNotedownFolder } from "../../utils/ReadUtils";
import { readAppSettings, updateAppSettings } from "../../utils/StatsUtils";

const Notes: React.FC = () => {
  const allNotes = useNoteStore((state) => state.notes);
  const updateNotes = useNoteStore((state) => state.updateNotes);
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const appSettings = useSettingsStore((state) => state.appSettings);

  const setAppSettings = useSettingsStore((state) => state.setAppSettings);
  const setActiveNoteTitle = useActiveStore(
    (state) => state.setActiveNoteTitle
  );

  useEffect(() => {
    readNotedownFolder().then((notes) => {
      updateNotes(notes);
    });
    readAppSettings().then((settings) => {
      setAppSettings(settings);
    });
  }, []);

  useEffect(() => {
    if (appSettings.lastOpened.length > 0)
      setActiveNoteTitle(appSettings.lastOpened);
  }, [appSettings]);

  const handleNoteClick = (noteName: string) => {
    const newSettings: AppSettingsProps = {
      ...appSettings,
      lastOpened: noteName,
    };
    updateAppSettings(newSettings);
    setActiveNoteTitle(noteName);
  };

  return (
    <div className="mt-10 overflow-y-scroll">
      <ul>
        <AnimatePresence>
          {allNotes &&
            allNotes.map((v, i) => {
              return (
                <motion.li
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: (i) => ({
                      opacity: 1,
                      transition: {
                        delay: i * 0.04,
                      },
                    }),
                  }}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className={
                    "p-1 pl-4 m-2 hover:bg-zinc-900 hover:cursor-pointer rounded-lg " +
                    (activeNoteTitle === v.name ? "bg-zinc-900" : "")
                  }
                  key={v.name}
                  onClick={() => handleNoteClick(v.name as string)}
                >
                  {v.name?.split(".")[0]}
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default Notes;
