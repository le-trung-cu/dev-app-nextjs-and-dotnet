import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "../types";
import { Project } from "../../projects/types";
import { Member } from "../../members/types";
import { Separator } from "@/components/ui/separator";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { MemberAvatar } from "../../members/components/member-avatar";
import { TaskDate } from "./task-date";
import { TaskActions } from "./task-actions";
import { MoreHorizontal } from "lucide-react";

type Props = {
  task: Task;
  project?: Project | null;
  assignee?: Member | null;
};
export const KanbanCard = ({ task, project, assignee }: Props) => {
  return (
    <Card className="gap-2 rounded-sm pt-3">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle>{task.name}</CardTitle>
          <TaskActions taskId={task.id} projectId={task.projectId}>
            <MoreHorizontal className="size-[18px] shrink-0 stroke-1 text-neutral-700 transition hover:opacity-75 hover:cursor-pointer" />
          </TaskActions>
        </div>
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2">
        {assignee && (
          <div className="flex items-center gap-x-1.5">
            <MemberAvatar className="mr-3 size-8" name={assignee.name} />
            <div className="size-1 rounded-full bg-neutral-300" />
            <TaskDate value={task.endDate} className="text-xs" />
          </div>
        )}
        {project && (
          <div className="flex items-center gap-x-1.5">
            <ProjectAvatar
              className="mr-3 size-8"
              imgUrl={project.imgUrl}
              name={project.name}
            />
            <span className="text-xs font-medium">{project.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
