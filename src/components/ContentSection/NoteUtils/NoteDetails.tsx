import { useEffect, useState } from "react";

import {
  useActiveNoteStore,
  useNoteDetailsStore,
} from "../../../store/NoteStore";
import { useUiStore } from "../../../store/UiStore";

type NoteDetailsProps = {
  contents: string;
};

const NoteDetails: React.FC<NoteDetailsProps> = (props) => {
  const { column, line } = useNoteDetailsStore();
  const content = useActiveNoteStore((state) => state.activeNote.content);
  const { editorActive } = useUiStore();

  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    countWordsAndChars();
  }, [props.contents]);

  const countWordsAndChars = () => {
    const words = props.contents.split(/\s|\r\n|\r|\n/); //matches whitespace and linebreaks(for all platforms)
    let wordCount = 0;
    words.forEach((word) => {
      if (word.trim() !== "" && word.trim().match(/[a-z]/i)) {
        wordCount++;
      }
    });
    setWordCount(wordCount);
    setCharCount(props.contents.length);
  };

  return (
    <span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
      {editorActive && (
        <>
          Ln {line} Col {column} |{" "}
        </>
      )}
      Words {wordCount} Chars {charCount}
    </span>
  );
};

export default NoteDetails;
