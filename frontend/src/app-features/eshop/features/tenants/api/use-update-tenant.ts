import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await clients.put(`/api/eshop/tenants/${data.id}`, data);
      return response.data.isSuccess;
    },
    onSuccess: (data) => {
      toast.success("Update tenant success");
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
