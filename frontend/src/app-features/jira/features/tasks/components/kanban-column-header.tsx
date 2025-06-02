import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { TaskStatus } from "../types";
import { useCreateTaskDialog } from "../hooks/use-create-task-dialog";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
};

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.Backlog]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.Todo]: (
    <CircleIcon className="size-[18px] text-red-400" />
  ),
  [TaskStatus.InProgress]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.InReview]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.Done]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
}

export const KanbanColumnHeader = ({
  board,
  taskCount
}: KanbanColumnHeaderProps) => {
  const { open } = useCreateTaskDialog();

  const icon = statusIconMap[board];

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">
          {board}
        </h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button onClick={open} variant="ghost" size="icon" className="size-5">
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
};
