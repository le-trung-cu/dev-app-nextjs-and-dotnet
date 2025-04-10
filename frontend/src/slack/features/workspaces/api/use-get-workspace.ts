import { useQuery } from "@tanstack/react-query";
import { clients } from "@/lib/clients";
import { GetWorkspaceByIdResponseType } from "../types";

export const useGetWorkspace = ({ workspaceId }: { workspaceId: string }) => {
  const request = useQuery({
    queryKey: ["workspaces", workspaceId],
    queryFn: async () => {
      const response = await clients.get<GetWorkspaceByIdResponseType>(
        `/api/slack/workspaces/${workspaceId}`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some erro");
      }
      return response.data.workspace;
    },
  });
  return request;
};
