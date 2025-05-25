"use client";
import { Editor } from "@tiptap/core";
import { useEffect, useRef } from "react";
import { useToolbarContext } from "./toolbar-context";

export const useSyncEditorToolbar = (editor: Editor | null) => {
  const { setValue } = useToolbarContext();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editor) return;

    const updateToolbar = () => {
      const fontFamily =
        editor.getAttributes("textStyle").fontFamily || "Arial";
      const fontSize = editor.getAttributes("textStyle").fontSize || "16px";
      const highlight = editor?.getAttributes("highlight").color ?? "#000000";
      const heading = editor?.getAttributes("heading").level ?? 0;
      const color = editor?.getAttributes("textStyle").color ?? "#000000";
      const lineHeight = editor?.getAttributes("paragraph").lineHeight;


      setValue("toolbar.fontFamily", fontFamily);
      setValue("toolbar.fontSize", fontSize);
      setValue("toolbar.heading", heading);
      setValue("toolbar.highlight", highlight);
      setValue("toolbar.color", color);
      setValue("toolbar.lineHeight", lineHeight);
      setValue("toolbar.bold", editor.isActive("bold"));
      setValue("toolbar.italic", editor.isActive("italic"));
      setValue("toolbar.underline", editor.isActive("underline"));
      setValue("toolbar.strike", editor.isActive("strike"));
      setValue("toolbar.link", editor?.isActive("link"));
      setValue("toolbar.taskList", editor?.isActive("taskList"));
      

      setValue(
        "toolbar.align",
        editor.isActive({ textAlign: "left" })
          ? "left"
          : editor.isActive({ textAlign: "center" })
            ? "center"
            : editor.isActive({ textAlign: "right" })
              ? "right"
              : editor.isActive({ textAlign: "justify" })
                ? "justify"
                : "left",
      );
    };

    const handler = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(updateToolbar, 100); // debounce 100ms
    };

    editor.on("selectionUpdate", updateToolbar);
    editor.on("transaction", handler);

    updateToolbar();

    return () => {
      editor.off("selectionUpdate", updateToolbar);
      editor.off("transaction", handler);
    };
  }, [editor]);
};
