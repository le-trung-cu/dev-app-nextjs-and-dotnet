import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      title,
      documentId,
    }: {
      title: string;
      documentId: string;
    }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        `/api/docs/documents/${documentId}`,
        { title },
      );
      if (!response.data.isSuccess) {
        throw new Error("has some Error");
      }

      return documentId;
    },
    onSuccess: (_, { documentId }) => {
      toast.success("Update document success");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  return mutation;
};
