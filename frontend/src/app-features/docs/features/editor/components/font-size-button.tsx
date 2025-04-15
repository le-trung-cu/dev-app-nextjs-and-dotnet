import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEditorStore } from "../stores";
import React, { useState } from "react";
import { useWatch } from "../toolbar-context/use-watch";

export const FontSizeButton = () => {
  const [editor] = useEditorStore();
  const current = useWatch("toolbar.fontSize") as string;

  const [inputValue, setInputValue] = useState(current);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handletInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(current) + 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  const decrement = () => {
    const newSize = parseInt(current) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="flex h-7 w-7 shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80"
        onClick={decrement}
      >
        <MinusIcon />
      </button>
      {isEditing ? (
        <Input
          onChange={handleInputChange}
          onBlur={handletInputBlur}
          onKeyDown={handleKeyDown}
          value={inputValue}
          type="text"
          autoFocus
          className="h-[28px] w-fit max-w-[60px] min-w-7 appearance-none px-1 text-center"
        />
      ) : (
        <button
          className="flex h-7 w-fit min-w-[60px] cursor-text items-center justify-center overflow-hidden rounded-sm border border-neutral-300 px-3 text-center text-sm hover:bg-neutral-200/80"
          onClick={() => {
            setIsEditing(true);
            setInputValue(current);
          }}
        >
          {current}
        </button>
      )}
      <button
        className="flex h-7 w-7 shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-300/80"
        onClick={increment}
      >
        <PlusIcon />
      </button>
    </div>
  );
};
