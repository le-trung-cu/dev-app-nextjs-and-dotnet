import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetMembersResponseType } from "../types";

export const useGetMembers = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await clients.get<GetMembersResponseType>(
        `/api/slack/workspaces/${workspaceId}/members`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }

      return response.data.members;
    },
  });

  return query;
};
