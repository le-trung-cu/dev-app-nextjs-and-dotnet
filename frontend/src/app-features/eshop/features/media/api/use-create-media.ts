import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createMediaSchema } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useCreateMedia = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (
      data: z.infer<typeof createMediaSchema> & {
        tenantId: string;
      },
    ) => {
      const response = await clients.post(`/api/eshop/medias`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success("create media success");
      queryClient.invalidateQueries({ queryKey: ["medias"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
