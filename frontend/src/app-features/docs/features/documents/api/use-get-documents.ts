import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetDocumentsResponseType } from "../types";

export const useGetDocuments = ({search, organizationId}:{search: string; organizationId?: string | null;}) => {
  const query = useQuery({
    queryKey: ['documents', organizationId, search],
    queryFn: async () => {
      const query = [];
      if(!!search) {
        query.push(`search=${search}`);
      }
      if(!!organizationId) {
        query.push(`organizationId=${organizationId}`);
      }
      const queryStr = query.join("&");

      const response = await clients.get<GetDocumentsResponseType>(`/api/docs/documents?${queryStr}`);
      if(response.data.isSuccess) {
        return response.data.documents;
      }
      throw new Error("has some wrong");
    },
    throwOnError: true,
  });

  return query;
}