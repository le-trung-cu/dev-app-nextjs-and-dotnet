import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetProjectsByWorkspaceIdResponseType } from "../types";

export const useGetProjects = ({workspaceId}: {workspaceId: string}) => {
  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await clients.get<GetProjectsByWorkspaceIdResponseType>(`/api/jira/workspaces/${workspaceId}/projects`);
      if(!response.data.isSuccess) {
        throw new Error("has some error");
      }
      return response.data.projects;
    },
    throwOnError: true
  });

  return query;
}