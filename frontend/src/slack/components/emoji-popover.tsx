import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { useState } from "react";

type EmojiPopoverProps = {
  children: React.ReactNode;
  onEmojiSelect?: (emoji: {native: string}) => void;
}

export const EmojiPopover = ({ children, onEmojiSelect }:EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  // const [tooltipOpen, setTooltipOpen] = useState(false);
  const onEmojiSelectHandler = (emoji: {native: string}) => {
    setPopoverOpen(false);
    onEmojiSelect?.(emoji);
  }
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Tooltip delayDuration={50}>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent className="z-[9999]">Emoji</TooltipContent>
      </Tooltip>
      <PopoverContent className="z-[9999]">
        <EmojiPicker data={data} onEmojiSelect={onEmojiSelectHandler}/>
      </PopoverContent>
    </Popover>
  );
};
