import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetMembersResponseType, Member } from "../types";

export const useGetMemberById = ({ workspaceId, userId }: { workspaceId: string, userId: string }) => {
  const query = useQuery({
    enabled: !!workspaceId && !!userId,
    queryKey: ["member", workspaceId, userId],
    queryFn: async () => {
      const response = await clients.get<{isSuccess: boolean; member: Member}>(
        `/api/slack/workspaces/${workspaceId}/members/${userId}`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }

      return response.data.member;
    },
  });

  return query;
};
