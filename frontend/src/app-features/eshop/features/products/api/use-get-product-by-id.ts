import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { clients } from "@/lib/clients";
import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

type params = {
  productId: string;
};
export const useGetProduct = ({ productId }: params) => {
  const query = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await clients.get(`/api/eshop/products/${productId}`);
      const product = response.data.product;
      product.tenant = response.data.tenant;
      return product;
    },
  });

  return query;
};

export const useSuspenseGetProduct = ({ productId }: params) => {
  const query = useSuspenseQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await clients.get(`/api/eshop/products/${productId}`);
      const product = response.data.product;
      product.tenant = response.data.tenant;
      return product;
    },
  });

  return query;
};

export const prefetchProduct = async (
  queryClient: QueryClient,
  { productId }: params,
) => {
  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axios.get(`/api/eshop/products/${productId}`, {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      });

      const product = response.data.product;
      product.tenant = response.data.tenant;
      return product;
    },
    staleTime: 1000 * 60,
  });

  return queryClient;
};
