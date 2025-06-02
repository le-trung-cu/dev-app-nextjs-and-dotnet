import { clients } from "@/lib/clients";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GetProjectsByWorkspaceIdResponseType } from "../types";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import axios from "axios";

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

export const prefetchProjects = async ({
  queryClient,
  token,
  workspaceId,
}: {
  queryClient: QueryClient;
  token: string;
  workspaceId: string;
}) => {
  return queryClient.prefetchQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await axios.get(`/api/jira/workspaces/${workspaceId}/projects`, {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSuccess) {
        throw new Error("have some error");
      }
      return response.data.projects;
    },
    staleTime: 1000 * 60,
  });
};
