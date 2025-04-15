import { useQuery } from "@tanstack/react-query";
import { clients } from "@/lib/clients";
import { GetWorkspaceByIdResponseType } from "../types";

export const useGetWorkspaceInfo = ({ workspaceId }: { workspaceId: string }) => {
  const request = useQuery({
    queryKey: ["workspace-info", workspaceId],
    queryFn: async () => {
      const response = await clients.get<GetWorkspaceByIdResponseType>(
        `/api/slack/workspaces/${workspaceId}/info`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some erro");
      }
      return response.data.workspace;
    },
  });
  return request;
};
