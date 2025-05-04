import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetDocumentsResponseType } from "../type";

export const useGetDocuments = ({search, organizationId}:{search: string; organizationId?: string | null;}) => {
  const query = useQuery({
    queryKey: ['docs/documents', organizationId, search],
    queryFn: async () => {
      const response = await clients.get<GetDocumentsResponseType>("/docs/documents");
      if(response.data.isSuccess) {
        return response.data.data;
      }
      throw new Error("has some wrong");
    },
    throwOnError: true,
  });

  return query;
}