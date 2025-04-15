"use client";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { ToolbarButton } from "./toolbar-button";
import { useEditorStore } from "../stores";
import { Separator } from "@/components/ui/separator";
import { FontFamilyButton } from "./font-family-button";
import { HeadingLevelButton } from "./heading-level-button";
import { HighlightColorButton } from "./highlight-color-button";
import { TextColorButton } from "./text-color-button";
import { LinkButton } from "./link-button";
import { ImageButton } from "./image-button";
import { AlignButton } from "./align-button";
import { ListButton } from "./list-button";
import { FontSizeButton } from "./font-size-button";
import { LineHeightButton } from "./line-height-button";
import { useWatch } from "../toolbar-context/use-watch";

export const Toolbar = () => {
  const [editor] = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    isActive?: () => boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false",
          );
        },
        isActive: () => editor?.view.dom.getAttribute("spellcheck") == "true",
      },
    ],
    [
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
        isActive: () => !!editor?.isActive("taskList"),
      },
    ],
  ];

  return (
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#F1F4F9] px-2.5 py-0.5">
      {/* {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          icon={item.icon}
          isActive={item.isActive?.()}
          onClick={item.onClick}
        />
      ))} */}
      <Separator
        orientation="vertical"
        className="bg-neutral-300 data-[orientation=vertical]:h-6"
      />
      <FontFamilyButton />
      <Separator
        orientation="vertical"
        className="bg-neutral-300 data-[orientation=vertical]:h-6"
      />
      <HeadingLevelButton />
      <Separator
        orientation="vertical"
        className="bg-neutral-300 data-[orientation=vertical]:h-6"
      />
      <FontSizeButton />
      <Separator
        orientation="vertical"
        className="bg-neutral-300 data-[orientation=vertical]:h-6"
      />
      <ToolbarTextDecorations />

      <TextColorButton />
      <HighlightColorButton />
      <Separator
        orientation="vertical"
        className="bg-neutral-300 data-[orientation=vertical]:h-6"
      />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      <TaskListButton />
    </div>
  );
};

const ToolbarTextDecorations = () => {
  const bold = useWatch("toolbar.bold") as boolean;
  const italic = useWatch("toolbar.italic") as boolean;
  const underline = useWatch("toolbar.underline") as boolean;
  const strike = useWatch("toolbar.strike") as boolean;

  const [editor] = useEditorStore();
  return (
    <>
      <ToolbarButton
        icon={BoldIcon}
        isActive={bold}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={ItalicIcon}
        isActive={italic}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={UnderlineIcon}
        isActive={underline}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        icon={StrikethroughIcon}
        isActive={strike}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      />
    </>
  );
};

const TaskListButton = () => {
  const isActive = useWatch("toolbar.taskList") as boolean;
  const [editor] = useEditorStore();
  return (
    <ToolbarButton
      icon={ListTodoIcon}
      isActive={isActive}
      onClick={() => editor?.chain().toggleTaskList().run()}
    />
  );
};
