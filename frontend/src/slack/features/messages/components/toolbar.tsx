import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmojiPopover } from "@/slack/components/emoji-popover";
import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";

type ToolbarProps = {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleThread: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
};
export const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleDelete,
  handleReaction,
  handleThread,
  hideThreadButton,
}: ToolbarProps) => {

  return (
    <div
      className={cn(
        "flex space-x-1.5 rounded-md bg-white",
      )}
    >
      <EmojiPopover onEmojiSelect={({ native }) => handleReaction(native)}>
        <Button variant="ghost" size="sm" className="size-7 shadow">
          <Smile className="size-5" />
        </Button>
      </EmojiPopover>
      {!hideThreadButton && (
        <Button variant="ghost" className="size-7 shadow" onClick={handleThread}>
          <MessageSquareTextIcon className="size-5" />
        </Button>
      )}
      {isAuthor && (
        <>
          <Button
            variant="ghost"
            className="size-7 shadow"
            onClick={handleEdit}
          >
            <Pencil className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 shadow"
            onClick={handleDelete}
          >
            <Trash className="size-5" />
          </Button>
        </>
      )}
    </div>
  );
};
