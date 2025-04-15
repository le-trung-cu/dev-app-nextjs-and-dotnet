import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "../stores";
import { ListCollapseIcon } from "lucide-react";
import { useWatch } from "../toolbar-context/use-watch";

export const LineHeightButton = () => {
  const [editor] = useEditorStore();
  const lineHeight = useWatch("toolbar.lineHeight") as string;

  const fonts = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 w-7 shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80">
          <ListCollapseIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fonts.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className={cn(lineHeight === item.value && "bg-neutral-200/80")}
            onClick={() => {
              editor?.chain().focus().setLineHeight(item.value).run();
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
