import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { clients } from "@/lib/clients";
import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

type params = {
  tenantId: string;
};
export const useGetTenant= ({ tenantId }: params) => {
  const query = useQuery({
    enabled: !!tenantId,
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      const response = await clients.get(`/api/eshop/tenants/${tenantId}`);
      return response.data.tenant;
    },
  });

  return query;
};

export const useSuspenseGetTenant= ({ tenantId }: params) => {
  const query = useSuspenseQuery({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      const response = await clients.get(`/api/eshop/tenants/${tenantId}`);
      return response.data.tenant;
    },
  });

  return query;
};

export const prefetchTenant = async (
  queryClient: QueryClient,
  { tenantId }: params,
) => {
  return queryClient.prefetchQuery({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      const response = await axios.get(`/api/eshop/tenants/${tenantId}`, {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      });

      return response.data.tenant;
    },
    staleTime: 1000 * 60,
  });
};
