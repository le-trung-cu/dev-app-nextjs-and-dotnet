import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createOrganizationSchema } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof createOrganizationSchema>) => {
      const response = await clients.post<{ isSuccess: boolean, organizationId: string }>(
        "/api/docs/organizations",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: () => {  
      toast.success("Create workspace success");
      queryClient.invalidateQueries({queryKey: ["organizations"]});
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
