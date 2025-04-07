import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetMemberResponseType } from "../types";

export const useGetCurrentMember = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const query = useQuery({
    queryKey: ["member-current", workspaceId],
    queryFn: async () => {
      const response = await clients.get<GetMemberResponseType>(
        `/api/slack/workspaces/${workspaceId}/members/current`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }

      return response.data.member;
    },
  });

  return query;
};
