import ReactMarkdown from "react-markdown";
import { useNoteDetailsStore } from "../../store/NoteStore";

import { useSettingsStore } from "../../store/SettingsStore";

import { getLineAndColumn } from "../../utils/StatsUtils";

type MainEditorProps = {
  setContents: React.Dispatch<React.SetStateAction<string>>;
  contents: string;
};

const MainEditor: React.FC<MainEditorProps> = (props) => {
  const editorStyle = useSettingsStore(
    (state) => state.appSettings.editorStyle
  );
  const { setLineAndColumn } = useNoteDetailsStore();

  const updateLineAndColumn = (
    e:
      | React.MouseEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const { line, column } = getLineAndColumn(e);
    setLineAndColumn(line, column);
  };

  return (
    <div className="p-4 h-full overflow-y-scroll ">
      {editorStyle === "code" ? (
        <textarea
          className="h-5/6 w-full outline-none bg-inherit resize-none leading-relaxed"
          onChange={(e) => props.setContents(e.target.value)}
          onKeyUp={(e) => updateLineAndColumn(e)}
          onMouseUp={(e) => updateLineAndColumn(e)}
          spellCheck={false}
          value={props.contents}
        />
      ) : (
        <ReactMarkdown className="prose prose-invert text-primary">
          {props.contents}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MainEditor;
