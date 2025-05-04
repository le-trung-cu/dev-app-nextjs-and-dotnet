"use client";

import { EditMenuItem } from "./edit-menu-item";
import { FileMenuItem } from "./file-menu-item";
import { Menubar as MenubarUi } from "@/components/ui/menubar";
import { InsertMenuItem } from "./insert-menu-item";
import { FormatMenuItem } from "./format-menu-item";

export const MenuBar = () => {
  return (
    <MenubarUi className="border-0 print:hidden">
      <FileMenuItem />
      <EditMenuItem />
      <InsertMenuItem/>
      <FormatMenuItem/>
    </MenubarUi>
  );
};
