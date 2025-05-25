import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({documentId}: {documentId: string}) => {
      const response = await clients.delete<{isSuccess: boolean}>(`/api/docs/documents/${documentId}`);
      if(!response.data.isSuccess) {
        throw new Error("has some errod");
      }
      return true;
    },
    onSuccess: (_, {documentId}) => {
      toast.info("Delete document susccess");
      queryClient.invalidateQueries({queryKey: ['documents']});
      queryClient.invalidateQueries({queryKey: ['document', documentId]});
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  return mutation;
}