import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ImageIcon, PaletteIcon, Table2Icon, XIcon } from "lucide-react";
import { useEditorStore } from "../../../editor/stores";

export const InsertMenuItem = () => {
  const [editor] = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };
  return (
    <MenubarMenu>
      <MenubarTrigger className="h-6 cursor-pointer rounded-sm px-2 text-sm hover:bg-neutral-200/80">
        Insert
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <ImageIcon /> Image
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>
            <Table2Icon className="text-muted-foreground mr-2 size-4" /> Table
          </MenubarSubTrigger>
          <MenubarPortal>
            <MenubarSubContent>
              <MenubarItem onClick={() => insertTable({rows: 1, cols: 1})}>
                1 <XIcon /> 1
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({rows: 2, cols: 2})}>
                2 <XIcon /> 2
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({rows: 3, cols: 3})}>
                3 <XIcon /> 3
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({rows: 4, cols: 4})}>
                4 <XIcon /> 4
              </MenubarItem>
            </MenubarSubContent>
          </MenubarPortal>
        </MenubarSub>
        <MenubarItem>
          <PaletteIcon /> Drawing
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
