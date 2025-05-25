import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { Document, GetDocumentsResponseType } from "../types";

export const useGetDocumentbyId = ({documentId}:{documentId: string}) => {
  const query = useQuery({
    queryKey: ['document', documentId],
    queryFn: async () => {
      const response = await clients.get<{isSuccess: boolean; document: Document}>(`/api/docs/documents/${documentId}`);
      if(response.data.isSuccess) {
        return response.data.document;
      }
      throw new Error("has some wrong");
    },
    throwOnError: true,
  });

  return query;
}