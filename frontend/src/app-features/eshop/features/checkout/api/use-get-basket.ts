import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";

export const useGetBasket = ({
  tenantId,
  userId,
}: {
  tenantId: string;
  userId: string;
}) => {
  const query = useQuery({
    enabled: !!tenantId && !userId,
    queryKey: ["basket", tenantId, userId],
    queryFn: async () => {
      try {
        const response = await clients.get(
          `/api/eshop/tenants/${tenantId}/basket/${userId}`,
        );
        return {
          shoppingCart: response.data.shoppingCart,
          count: response.data.shoppingCart.items.reduce((result, item) => result + item.quantity ,0),
          total: response.data.shoppingCart.items.reduce((result, item) => result + item.price * item.quantity ,0)
        };
      } catch {
        return null;
      }
    },
    retry: false,
  });

  return query;
};
