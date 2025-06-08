import React from "react";
import { useRouter } from "next/navigation";


import { cn } from "@/lib/utils";

import { Member } from "../../members/types";
import { Project } from "../../projects/types";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { Task } from "../types";
import { MemberAvatar } from "../../members/components/member-avatar";
import { ProjectAvatar } from "../../projects/components/project-avatar";

interface EventCardProps {
  title: string;
  assignee: Member;
  project: Project;
  status: Task["status"];
  id: string;
};

const statusColorMap: Record<Task["status"], string> = {
  'Backlog': "border-l-pink-500",
  'Todo': "border-l-red-500",
  'InProgress': "border-l-yellow-500",
  'InReview': "border-l-blue-500",
  'Done': "border-l-emerald-500",
};

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  id,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    router.push(`/jira/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div onClick={onClick} className={cn(
        "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
        statusColorMap[status]
      )}>
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          {assignee && <MemberAvatar
            name={assignee?.name}
            className="size-8"
          />}
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar
            name={project?.name}
            imgUrl={project?.imgUrl}
            className="size-8"
          />
        </div>
      </div>
    </div>
  );
};
