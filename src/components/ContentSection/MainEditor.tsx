import ReactMarkdown from "react-markdown";

import { useSettingsStore } from "../../store/SettingsStore";

type MainEditorProps = {
  setContents: React.Dispatch<React.SetStateAction<string>>;
  contents: string;
};

const MainEditor: React.FC<MainEditorProps> = (props) => {
  const editorStyle = useSettingsStore(
    (state) => state.appSettings.editorStyle
  );

  return (
    <div className="p-4 h-full overflow-y-scroll ">
      {editorStyle === "code" ? (
        <textarea
          className="h-5/6 w-full outline-none bg-inherit resize-none text-gray-300 leading-relaxed"
          onChange={(e) => props.setContents(e.target.value)}
          spellCheck={false}
          value={props.contents}
        />
      ) : (
        <ReactMarkdown className="prose prose-invert">
          {props.contents}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MainEditor;
