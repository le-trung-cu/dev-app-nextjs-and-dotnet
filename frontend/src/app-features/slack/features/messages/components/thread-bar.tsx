import { ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ThreadBarProps {
  count?: number;
  timestamp?: string;
  name?: string;
  onClick?: () => void;
}

export const ThreadBar = ({ count, timestamp, onClick }: ThreadBarProps) => {
  if (!count || !timestamp) return null;

  return (
    <button
      onClick={onClick}
      className="hover:border-border group/thread-bar flex max-w-[600px] items-center justify-start rounded-md border border-transparent p-1 transition hover:bg-white"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="truncate text-xs font-bold text-sky-700 hover:underline">
          {count} {count > 1 ? "replies" : "reply"}
        </span>
        <span className="text-muted-foreground block truncate text-xs group-hover/thread-bar:hidden">
          Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
        <span className="text-muted-foreground hidden truncate text-xs group-hover/thread-bar:block">
          View thread
        </span>
      </div>
      <ChevronRight className="text-muted-foreground ml-auto size-4 shrink-0 opacity-0 transition group-hover/thread-bar:opacity-100" />
    </button>
  );
};
