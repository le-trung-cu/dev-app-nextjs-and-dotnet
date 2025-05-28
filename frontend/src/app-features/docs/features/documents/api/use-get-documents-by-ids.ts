import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";

export const useGetDocumentsByIds = ({
  documentIds,
}: {
  documentIds: string[];
}) => {
  const query = useQuery({
    enabled: documentIds.length > 0,
    queryKey: ["title-documents", ...documentIds],
    queryFn: async () => {
      const response = await clients.get<{
        isSuccess: boolean;
        documents: Record<string, string>;
      }>(`/api/docs/documents/documents-ids`);
      if (response.data.isSuccess) {
        return response.data.documents;
      }
      throw new Error("has some wrong");
    },
    throwOnError: true,
  });

  return query;
};
