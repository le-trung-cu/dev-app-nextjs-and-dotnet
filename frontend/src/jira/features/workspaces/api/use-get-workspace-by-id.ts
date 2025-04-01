import { clients } from "@/lib/clients"
import { useQuery } from "@tanstack/react-query"

export const useGetWorkspaceById = ({workspaceId}: {workspaceId: string}) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await clients.get(`/api/jira/workspaces/${workspaceId}`);
      return response.data;
    }
  });

  return query;
}