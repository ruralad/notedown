import { BookDownIcon, Edit3Icon } from "lucide-react";
import { AppSettingsProps } from "../../../../../types/Settings";
import { useSettingsStore } from "../../../../store/SettingsStore";
import { updateAppSettings } from "../../../../utils/StatsUtils";

const PreviewAsMD = () => {
  const { appSettings, setAppSettings } = useSettingsStore();

  const handleEditorStyle = (style: "code" | "markdown") => {
    const newSettings: AppSettingsProps = {
      ...appSettings,
      editorStyle: style,
    };
    updateAppSettings(newSettings);
    setAppSettings(newSettings);
  };

  return (
    <>
      {!!(appSettings.editorStyle === "markdown") ? (
        <span
          onClick={() => handleEditorStyle("code")}
          className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
        >
          <Edit3Icon size={16} />
          <span>Edit</span>
        </span>
      ) : (
        <span
          onClick={() => handleEditorStyle("markdown")}
          className="flex px-2 py-1.5 items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-default rounded transition-colors"
        >
          <BookDownIcon size={15} />
          <span>Preview</span>
        </span>
      )}
    </>
  );
};

export default PreviewAsMD;
