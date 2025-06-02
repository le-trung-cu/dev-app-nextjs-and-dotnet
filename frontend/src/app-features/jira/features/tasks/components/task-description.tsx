import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilIcon, XIcon } from "lucide-react";
import { Task } from "../types";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";

type Props = {
  task: Task;
};

export const TaskDescription = ({ task }: Props) => {
  const workspaceId = useWorkspaceId();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description ?? "");

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate(
      {
        workspaceId,
        taskId: task.id,
        description: value,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Description</CardTitle>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            {isEditing ? (
              <XIcon className="mr-2 size-4" />
            ) : (
              <PencilIcon className="mr-2 size-4" />
            )}
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        {isEditing ? (
          <div className="flex flex-col gap-y-4">
            <Textarea
              placeholder="Add a description..."
              value={value}
              rows={4}
              onChange={(e) => setValue(e.target.value)}
              disabled={isPending}
            />
            <Button
              size="sm"
              className="ml-auto w-fit"
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        ) : (
          <div>
            {task.description || (
              <span className="text-muted-foreground">No description set</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
