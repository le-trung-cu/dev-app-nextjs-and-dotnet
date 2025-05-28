import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { Member } from "../types";

export const useGetMembers = ({
  organizationId,
}: {
  organizationId?: string;
}) => {
  const query = useQuery({
    enabled: !!organizationId,
    queryKey: ["members", organizationId],
    queryFn: async () => {
      const response = await clients.get<{
        isSuccess: boolean;
        members: Member[];
      }>(`/api/docs/organizations/${organizationId}/members`);
      if (!response.data.isSuccess) {
        throw new Error("have some error");
      }
      return response.data.members;
    },
    throwOnError: true,
  });

  return query;
};
