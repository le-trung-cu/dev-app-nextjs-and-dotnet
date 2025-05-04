import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorResult, SketchPicker } from "react-color";
import { useEditorStore } from "../stores";
import { PencilIcon } from "lucide-react";
import { useWatch } from "../toolbar-context/use-watch";

export const HighlightColorButton = () => {
  const [editor] = useEditorStore();
  const color = useWatch("toolbar.highlight") as string;

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <PencilIcon className="size-4 leading-none" />
          <div
            className="h-1 w-[80%]"
            style={{
              backgroundColor: color,
            }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden rounded-md p-0">
        <SketchPicker
          styles={{
            default: {
              picker: {
                width: "unset",
                border: "none",
                boxShadow: "none",
                borderRadius: "none",
              },
            },
          }}
          color={color}
          onChange={(e: ColorResult) => {
            editor?.chain().focus().toggleHighlight({ color: e.hex }).run();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
