import ReactMarkdown from "react-markdown";
import { useEditorStore } from "../../store/EditorStore";

type MainEditorProps = {
  setContents: React.Dispatch<React.SetStateAction<string>>;
  contents: string;
};

const MainEditor: React.FC<MainEditorProps> = (props) => {
  const editorStyle = useEditorStore((state) => state.editorStyle);

  return (
    <div className="p-4 h-full">
      {editorStyle === "code" ? (
        <textarea
          className="h-5/6 overflow-y-scroll w-full outline-none bg-inherit resize-none text-gray-300 leading-relaxed"
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
