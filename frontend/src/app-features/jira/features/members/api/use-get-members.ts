import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetMemberResponseType } from "../types";

export const useGetMembers = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await clients.get<GetMemberResponseType>(
        `/api/jira/workspaces/${workspaceId}/members`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }
      return response.data.members;
    },
    throwOnError: true,
  });

  return query;
};
