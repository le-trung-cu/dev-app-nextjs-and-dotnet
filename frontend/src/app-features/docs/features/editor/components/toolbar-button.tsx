import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type ToolbarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

export const ToolbarButton = ({
  onClick,
  isActive = false,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};
