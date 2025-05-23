import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTenant = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await clients.post("/api/eshop/tenants", data);
      return response.data.tenant;
    },
    onSuccess: (data) => {
      toast.success("Create new tenant success");
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
