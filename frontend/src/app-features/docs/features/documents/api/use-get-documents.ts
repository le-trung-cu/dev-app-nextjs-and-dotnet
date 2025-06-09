import { clients } from "@/lib/clients";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetDocumentsResponseType } from "../types";
import { useGetProductsInfinitie } from "@/app-features/eshop/features/products/api/use-get-products";

export const useGetDocuments = ({search, organizationId}:{search: string; organizationId?: string | null;}) => {
  const query = useInfiniteQuery({
    queryKey: ['documents', organizationId, search],
    initialPageParam: 1,
    
    getNextPageParam: (lastPage) => {
      const {count, pageIndex, pageSize} = lastPage as any;
      if((pageIndex - 1) * pageSize < count) {
        return pageIndex + 1;
      }
      return undefined;
    },
    queryFn: async (pageParams) => {
      const {pageParam} = pageParams;
      // debugger;
      const query = [`pageIndex=${pageParam}`, `pageSize=${5}`];
      if(!!search) {
        query.push(`search=${search}`);
      }
      if(!!organizationId) {
        query.push(`organizationId=${organizationId}`);
      }
      const queryStr = query.join("&");

      const response = await clients.get<GetDocumentsResponseType>(`/api/docs/documents?${queryStr}`);
      if(response.data?.isSuccess) {
        return response.data.documents;
      }
      throw new Error("has some wrong");
    },
    throwOnError: true,
  });

  return query;
}