import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { clients } from "@/lib/clients";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

type params = {
  tenantId: string;
};
export const useGetTenants = () => {
  const query = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const response = await clients.get(`/api/eshop/tenants`);
      return response.data.tenants;
    },
  });

  return query;
};
