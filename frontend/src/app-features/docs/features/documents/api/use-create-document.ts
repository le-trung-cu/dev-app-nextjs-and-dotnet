import { clients } from "@/lib/clients";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateDocument = () => {
  const mutation = useMutation({
    mutationFn: async (data: { title: string; inititalContent?: string | null }) => {
      const response = await clients.post<{
        isSuccess: boolean;
        documentId: string;
      }>("/docs/documents", { data });
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: () => {
      toast.success("Document created success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
