import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../types";
import { Workspace } from "../../workspaces/types";
import { Project } from "../../projects/types";
import { Member } from "../../members/types";

interface params {
  workspaceId: string;
  taskId: string;
}

export const useGetTaskById = ({ workspaceId, taskId }: params) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await clients.get<{
        isSuccess: boolean;
        task: Task;
        workspace: Workspace;
        project: Project;
        assignee: Member;
      }>(`/jira/workspaces/${workspaceId}/tasks/${taskId}`);

      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }

      const { isSuccess, ...data } = response.data;
      return data;
    },
    throwOnError: true,
  });

  return query;
};
