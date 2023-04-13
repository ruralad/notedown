export type NoteProps = {
  noteId: string;
  noteNo: number;
  title: string;
  content: string;
  createdAt: string;
};

export type AppSettingsProps = {
  lastOpened: string;
  notesCreated: number;
  notesDeleted: number;
};
