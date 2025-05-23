import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { clients } from "@/lib/clients";
import { sleep } from "@/lib/utils";
import {
  QueryClient,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";

export const useAdminGetProducts = () => {
  const query = useQuery({
    queryKey: ["admin/products"],
    queryFn: async () => {
      const response = await clients.get("/api/eshop/admin/products?pageIndex=1");
      return response.data.products.data;
    },
  });

  return query;
};

export const useAdminGetProductsInfinitie = ({tenantId, categoryId}:{tenantId?: string, categoryId?: string}) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ["admin/products", tenantId, categoryId],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return undefined;
    },
    queryFn: async ({ pageParam = 1 }) => {
      const queryArr = [];
      if(tenantId) {
        queryArr.push(`tenantId=${tenantId}`);
      }
       if(categoryId) {
        queryArr.push(`categoryId=${categoryId}`);
      }
      queryArr.push(`pageIndex=${pageParam}`)
      let queryString = queryArr.join("&");

      const response = await axios.get(`/api/eshop/admin/products?${queryString}`, {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      });

      const products =  response.data.products;
      const tenants = response.data.tenants.reduce((result, item) => {
        result[item.id] = item;
        return result;
      }, {});

      products.data.forEach(item => {
        item["tenant"] = tenants[item.tenantId];
        delete item["tenantId"];
      });
      console.log(products, tenants)
      return products;
    },
  });

  return query;
};

export const prefetchProductsInfinite = async (
  queryClient: QueryClient,
  {tenantId, categoryId}:{tenantId?: string, categoryId?: string}) => {
  return queryClient.fetchInfiniteQuery({
    queryKey: ["products", tenantId, categoryId],
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return undefined;
    },
    queryFn: async ({ pageParam = 1 }) => {
      const queryArr = [];
      if(tenantId) {
        queryArr.push(`tenantId=${tenantId}`);
      }
       if(categoryId) {
        queryArr.push(`categoryId=${categoryId}`);
      }
      queryArr.push(`pageIndex=${pageParam}`)
      
      let queryString = queryArr.join("&");

      const response = await axios.get(`/api/eshop/products?${queryString}`, {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      });

       const products =  response.data.products;
      const tenants = response.data.tenants.reduce((result, item) => {
        result[item.id] = item;
        return result;
      }, {});

      products.data.forEach(item => {
        item["tenant"] = tenants[item.tenantId];
        delete item["tenantId"];
      });

      return products;
    },
  });
};

export const prefetchProducts = async (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/eshop/products", {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      });

      return response.data.products;
    },
    staleTime: 1000 * 60,
  });
};
