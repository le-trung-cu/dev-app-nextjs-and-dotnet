import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "../stores";
import { ChevronsUpDownIcon } from "lucide-react";
import { useMemo } from "react";
import { useWatch } from "../toolbar-context/use-watch";

export const HeadingLevelButton = () => {
  const [editor] = useEditorStore();
  const _heading = useWatch("toolbar.heading");

  const headings = useMemo(
    () =>
      [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
        { label: "Heading 6", value: 6, fontSize: "14px" },
      ] as const,
    [],
  );

  const heading = useMemo(
    () => headings.find((x) => x.value === _heading),
    [headings, _heading],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 w-[120px] shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80">
          <span className="truncate">{heading?.label}</span>
          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {headings.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className={cn(
              editor?.isActive("heading", { level: item.value }) &&
                "bg-neutral-200/80",
            )}
            onClick={() => {
              if (item.value === 0) {
                editor?.chain().focus().setParagraph().run();
                return;
              }
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: item.value })
                .run();
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
