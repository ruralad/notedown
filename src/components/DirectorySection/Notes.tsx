import { appWindow } from "@tauri-apps/api/window";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { ScrollArea } from "../ui/scroll-area";

import { useActiveNoteStore, useNoteStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";

import { updateAppSettings } from "../../utils/StatsUtils";

import { AppSettingsProps } from "../../../types/Settings";

const Notes: React.FC = () => {
  const { notes } = useNoteStore();
  const { activeNoteTitle, setActiveNoteTitle } = useActiveNoteStore();
  const { appSettings, setAppSettings } = useSettingsStore();

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
          {notes &&
            notes.map((v, i) => {
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
