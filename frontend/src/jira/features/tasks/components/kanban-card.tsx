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

type Props = {
  task: Task;
  project?: Project | null;
  assignee?: Member | null;
};
export const KanbanCard = ({ task, project, assignee }: Props) => {
  return (
    <Card className="rounded-sm pt-3 gap-2">
      <CardHeader className="pb-0">
        <CardTitle>{task.name}</CardTitle>
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2">
        {project && (
          <div className="flex items-center">
            <ProjectAvatar
              className="mr-3 size-8"
              imgUrl={project.imgUrl}
              name={project.name}
            />
            {project.name}
          </div>
        )}
        {assignee && (
          <div className="flex items-center">
            <MemberAvatar className="mr-3 size-8" name={assignee.name} />
            {assignee.name}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
