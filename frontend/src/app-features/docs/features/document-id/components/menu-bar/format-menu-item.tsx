import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { AlignJustifyIcon, BoldIcon } from "lucide-react";

export const FormatMenuItem = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger className="h-6 cursor-pointer rounded-sm px-2 text-sm hover:bg-neutral-200/80">
        Format
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <BoldIcon /> Text
        </MenubarItem>
        <MenubarItem>
          <AlignJustifyIcon /> Paragraph styles
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
