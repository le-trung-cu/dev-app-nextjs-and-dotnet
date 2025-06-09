import { clients } from "@/lib/clients"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Media } from "../types";

export const useGetMedias = ({tenantId}:{tenantId: string, }) => {
  const query = useQuery({
    queryKey: ["medias", tenantId],
    queryFn: async () => {
      const response = await clients.get<{isSuccess: boolean, medias: Media[]}>( `/api/eshop/tenants/${tenantId}/medias?pageIndex=1&pageSize=50`);
      return response.data.medias;
    }
  });

  return query;
}