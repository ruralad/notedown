import { appWindow } from "@tauri-apps/api/window";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { useActiveStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";

import { updateAppSettings } from "../../utils/StatsUtils";

import { AppSettingsProps } from "../../../types/Settings";
import { ScrollArea } from "../ui/scroll-area";

const Notes: React.FC = () => {
  const allNotes = useNoteStore((state) => state.notes);
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const appSettings = useSettingsStore((state) => state.appSettings);

  const setAppSettings = useSettingsStore((state) => state.setAppSettings);
  const setActiveNoteTitle = useActiveStore(
    (state) => state.setActiveNoteTitle
  );

  useEffect(() => {
    if (appSettings.lastOpened.length > 0)
      setActiveNoteTitle(appSettings.lastOpened);
  }, [appSettings]);

  const handleNoteClick = async (noteName: string) => {
    await appWindow.setTitle(`${noteName.split(".json")[0]} - Notedown`);
    const newSettings: AppSettingsProps = {
      ...appSettings,
      lastOpened: noteName,
    };
    updateAppSettings(newSettings);
    setAppSettings(newSettings);
    setActiveNoteTitle(noteName);
  };

  return (
    <div className="mt-10">
      <ScrollArea className="h-full w-full">
        <AnimatePresence>
          {allNotes &&
            allNotes.map((v, i) => {
              return (
                <motion.div
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
                    "p-1 pl-4 m-2 hover:cursor-pointer hover:bg-accent rounded-lg " +
                    (activeNoteTitle === v.name ? "bg-muted" : "")
                  }
                  key={v.name}
                  onClick={() => handleNoteClick(v.name as string)}
                >
                  {v.name?.split(".json")[0]}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default Notes;
