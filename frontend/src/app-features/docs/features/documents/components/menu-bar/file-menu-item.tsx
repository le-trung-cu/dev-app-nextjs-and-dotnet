import { BsFilePdf } from "react-icons/bs";
import {
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FilesIcon,
  FileTextIcon,
  FolderIcon,
  GlobeIcon,
  PrinterIcon,
  Trash2Icon,
} from "lucide-react";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "../../../editor/stores";

export const FileMenuItem = () => {
  const [editor] = useEditorStore();
  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, `document.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([JSON.stringify(content)], {
      type: "text/html",
    });

    onDownload(blob, `document.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([JSON.stringify(content)], {
      type: "text/plain",
    });

    onDownload(blob, `document.txt`);
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="h-6 cursor-pointer rounded-sm px-2 text-sm hover:bg-neutral-200/80">
        File
      </MenubarTrigger>
      <MenubarContent className="print:hidden">
        <MenubarItem>
          <FilePlusIcon /> New File
        </MenubarItem>
        <MenubarItem>
          <FolderIcon /> Open
        </MenubarItem>
        <MenubarItem>
          <FilesIcon /> Make a copy
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>
            <FileIcon className="text-muted-foreground mr-2 size-4" /> Export as
          </MenubarSubTrigger>
          <MenubarPortal>
            <MenubarSubContent>
              <MenubarItem onClick={onSaveJSON}>
                <FileJsonIcon />
                Export as JSON
              </MenubarItem>
              <MenubarItem onClick={onSaveHTML}>
                <GlobeIcon />
                Export as Html
              </MenubarItem>
              <MenubarItem onClick={() => window.print()}>
                <BsFilePdf />
                Export as Pdf
              </MenubarItem>
              <MenubarItem onClick={onSaveText}>
                <FileTextIcon />
                Export as Text
              </MenubarItem>
            </MenubarSubContent>
          </MenubarPortal>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>
          <FilePenIcon /> Rename
        </MenubarItem>
        <MenubarItem>
          <Trash2Icon /> Remove
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => window.print()}>
          <PrinterIcon /> Print
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
