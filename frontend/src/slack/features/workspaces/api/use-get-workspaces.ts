import { clients } from "@/lib/clients"
import { useQuery } from "@tanstack/react-query"
import { GetWorkspacesResponseType } from "../types"

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await clients.get<GetWorkspacesResponseType>("/api/slack/workspaces");
      if(!response.data.isSuccess)
      {
        throw new Error("have some error");
      }
      return response.data.workspaces;
    },
    throwOnError: true,
  });

  return query;
}