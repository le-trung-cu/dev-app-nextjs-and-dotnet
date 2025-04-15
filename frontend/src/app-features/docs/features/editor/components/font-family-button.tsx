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

export const FontFamilyButton = () => {
  const [editor] = useEditorStore();
  const fontFamily = useWatch("toolbar.fontFamily");
  const fonts = useMemo(
    () => [
      { label: "Arial", value: "Arial" },
      { label: "Times New Roman", value: "Times New Roman" },
      { label: "Courier New", value: "Courier New" },
      { label: "Georgia", value: "Georigia" },
      { label: "Verdana", value: "Verdana" },
    ],
    [],
  );

  const font = useMemo(
    () => fonts.find((x) => x.value === fontFamily),
    [fonts, fontFamily],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 w-[120px] shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80">
          <span className="truncate">{font?.label}</span>
          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fonts.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className={cn(
              editor?.isActive("textStyle", { fontFamily: item.value }) &&
                "bg-neutral-200/80",
            )}
            onClick={() => {
              editor?.chain().focus().setFontFamily(item.value).run();
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
