import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Redo2, Undo2 } from "lucide-react";
import { useEditorStore } from "../../../editor/stores";

export const EditMenuItem = () => {
  const [editor] = useEditorStore();
  return (
    <MenubarMenu>
      <MenubarTrigger className="h-6 cursor-pointer rounded-sm px-2 text-sm hover:bg-neutral-200/80">
        Edit
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => editor?.chain().undo().run()}>
          <Undo2 /> Undo
        </MenubarItem>
        <MenubarItem onClick={() => editor?.chain().redo().run()}>
          <Redo2 /> Redo
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
