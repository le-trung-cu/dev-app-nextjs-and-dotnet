import { clients } from "@/lib/clients"
import { useQuery } from "@tanstack/react-query"
import { Organization } from "../types";

export const useGetOrganizations = () => {
  const query = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const response = await clients.get<{isSuccess: boolean; organizations: Organization[]}>("/api/docs/organizations");
      if(!response.data.isSuccess)
      {
        throw new Error("have some error");
      }
      return response.data.organizations;
    },
    throwOnError: true,
  });

  return query;
}