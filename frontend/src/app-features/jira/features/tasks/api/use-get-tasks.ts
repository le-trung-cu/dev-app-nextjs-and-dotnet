import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetTasksRequestType, GetTasksResponseType } from "../types";
import { Member } from "../../members/types";

export const useGetTasks = (filter: GetTasksRequestType) => {
  const { workspaceId, projectId, assigneeId, endDate, status } = filter;
  const query = useQuery({
    queryKey: ["tasks", workspaceId, projectId, assigneeId, endDate, status],
    queryFn: async () => {
      let query: Record<string, unknown> = {
        projectId: projectId || undefined,
        assigneeId: assigneeId || undefined,
        status: status || undefined,
        endDate: endDate || undefined,
      };
      query = Object.keys(query).reduce(
        (prev, key) => {
          if (query[key] !== undefined) {
            prev[key] = query[key];
            return prev;
          }
          return prev;
        },
        {} as Record<string, unknown>,
      );

      const queryString = new URLSearchParams(
        query as Record<string, string>,
      ).toString();
      const response = await clients.get<GetTasksResponseType>(
        `/api/jira/workspaces/${workspaceId}/tasks?${queryString}`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }
      const members = response.data.members.reduce((value, item) => {
        value[item.id] = item;
        return value;
      }, {} as Record<Member["id"], Member>);
      return {
        tasks: response.data.tasks,
        members,
      };
    },
    throwOnError: true,
    retry: false,
  });

  return query;
};
