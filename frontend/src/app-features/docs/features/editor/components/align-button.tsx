import { cn } from "@/lib/utils";
import { useEditorStore } from "../stores";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AiFillCaretDown } from "react-icons/ai";
import { useWatch } from "../toolbar-context/use-watch";
import { useState } from "react";

export const AlignButton = () => {
  const [editor] = useEditorStore();
  const align = useWatch("toolbar.align");
  const [open, setOpen] = useState(false);
  const aligns = [
    { label: "Left", value: "left", icon: AlignLeftIcon },
    { label: "Center", value: "center", icon: AlignCenterIcon },
    { label: "Right", value: "right", icon: AlignRightIcon },
    { label: "Justify", value: "justify", icon: AlignJustifyIcon },
  ] as const;

  const currentAlign =
    aligns.find((item) => item.value === align) ??
    aligns[0];

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button onClick={() => setOpen(true)} className="flex h-7 w-10 shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80">
          <currentAlign.icon className="size-4" />
          <AiFillCaretDown className="size-2"/>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit z-50">
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            editor?.chain().focus().setTextAlign(value).run();
          }}
        >
          {aligns.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              className={cn(
                align === item.value &&
                  "bg-neutral-200/80",
              )}
            >
              {<item.icon />}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
};
