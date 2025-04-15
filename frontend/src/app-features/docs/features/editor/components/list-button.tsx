import { cn } from "@/lib/utils";
import { useEditorStore } from "../stores";
import { ListIcon, ListOrderedIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiFillCaretDown } from "react-icons/ai";

export const ListButton = () => {
  const [editor] = useEditorStore();
  const aligns = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Order List",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-7 w-10 shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80">
          <ListIcon className="size-4" />
          <AiFillCaretDown className="size-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <div className="flex items-center">
          {aligns.map((item) => (
            <button
              key={item.label}
              className={cn("h-[36px] items-center px-2 hover:bg-neutral-200/80",item.isActive && "bg-neutral-200/80")}
              onClick={item.onClick}
            >
              {<item.icon />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
