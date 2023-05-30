import { useActiveNoteStore } from "../../../../store/NoteStore";
import { useSettingsStore } from "../../../../store/SettingsStore";

import { TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";

import { updateDeletedNotesCount } from "../../../../utils/StatsUtils";
import { deleteNote } from "../../../../utils/WriteUtils";

const DeleteNote = () => {
  const { activeNoteTitle } = useActiveNoteStore();
  const { appSettings, setAppSettings } = useSettingsStore();

  const removeNote = () => {
    deleteNote(activeNoteTitle).then(() => {
      updateDeletedNotesCount(appSettings).then((newSettings) => {
        setAppSettings(newSettings);
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground hover:text-red-600 cursor-default rounded transition-colors">
          <TrashIcon size={15} /> Delete Note
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            Delete {activeNoteTitle.split(".json")[0]} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will{" "}
            <span className="underline">permanently</span> remove the file from
            the system!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-primary"
            onClick={removeNote}
          >
            {" "}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNote;
