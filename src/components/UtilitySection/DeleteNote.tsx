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
} from "../../components/ui/alert-dialog";
import { useActiveStore } from "../../store/NoteStore";
import { useSettingsStore } from "../../store/SettingsStore";
import { updateDeletedNotesCount } from "../../utils/StatsUtils";
import { deleteNote } from "../../utils/WriteUtils";
const DeleteNote = () => {
  const activeNoteTitle = useActiveStore((state) => state.activeNoteTitle);
  const appSettings = useSettingsStore((state) => state.appSettings);

  const setAppSettings = useSettingsStore((state) => state.setAppSettings);

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
        <TrashIcon
          size={15}
          className="hover:text-red-600 hover:cursor-pointer"
        />
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
