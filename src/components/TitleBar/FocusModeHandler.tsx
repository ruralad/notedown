import { useUiStore } from "../../store/UiStore";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import { CircleDotIcon, PlusCircleIcon } from "lucide-react";

const FocusModeHandler = () => {
  const { focusMode, setFocusMode } = useUiStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="grid place-items-center w-8 h-8 p-2 rounded-lg hover:bg-accent hover:text-primary"
            onClick={() => setFocusMode()}
          >
            {focusMode ? (
              <CircleDotIcon size={16} />
            ) : (
              <PlusCircleIcon size={16} />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{focusMode ? "Switch to Focus Mode" : "Switch to Default Mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FocusModeHandler;
