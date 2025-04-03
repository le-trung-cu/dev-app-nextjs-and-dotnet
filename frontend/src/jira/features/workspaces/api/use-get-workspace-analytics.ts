import { clients } from "@/lib/clients"
import { useQuery } from "@tanstack/react-query"
import { GetWorkspaceAnalyticsResponseType } from "../types";

export const useGetWorkspaceAnalytics = ({workspaceId}:{workspaceId: string}) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const response = await clients.get<GetWorkspaceAnalyticsResponseType>(`/api/jira/workspaces/${workspaceId}/analytics`);
      if(!response.data.isSuccess) {
        throw new Error("has some error");
      }
      return response.data.workspaceAnalytics;
    }
  });

  return query;
}