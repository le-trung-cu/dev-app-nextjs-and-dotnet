import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { clients } from "@/lib/clients";
import { sleep } from "@/lib/utils";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await clients.get("/api/eshop/categories");
      return response.data.categories;
    },
  });

  return query;
};

export const prefetchCategories = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/api/eshop/categories", {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      });

      return response.data.categories;
    },
    staleTime: 1000 * 60,
  });

  return queryClient;
};
