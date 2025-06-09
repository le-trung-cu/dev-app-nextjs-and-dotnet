import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import { OverviewProperty } from "./overview-property";
import { Member } from "../../members/types";
import { Task } from "../types";
import { MemberAvatar } from "../../members/components/member-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./status-badge";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

type Props = {
  task: Task;
  assignee: Member;
};

export const TaskOverview = ({ task, assignee }: Props) => {
    const { open } = useEditTaskModal();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Orverview</CardTitle>
          <Button variant="outline" onClick={() => open(task.id)}>
            <Pencil /> Edit
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-3">
        {assignee && <OverviewProperty label="Assignee">
          <MemberAvatar name={assignee.name} />
          {assignee.name}
        </OverviewProperty>}
        <OverviewProperty label="Due Date">
          <TaskDate value={task.endDate} />
        </OverviewProperty>
        <OverviewProperty label="Status">
          <StatusBadge variant={task.status}>{task.status}</StatusBadge>
        </OverviewProperty>
      </CardContent>
    </Card>
  );
};
