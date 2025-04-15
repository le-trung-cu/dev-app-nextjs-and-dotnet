import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorResult, SketchPicker } from "react-color";
import { useEditorStore } from "../stores";
import { useWatch } from "../toolbar-context/use-watch";

export const TextColorButton = () => {
  const [editor] = useEditorStore();
  const color = useWatch("toolbar.color") as string;

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <span className="leading-none">A</span>
          <div
            className="h-1 w-[80%]"
            style={{
              backgroundColor: color,
            }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-md overflow-hidden">
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
            editor
              ?.chain()
              .focus()
              .setColor(e.hex || "#000000")
              .run();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
