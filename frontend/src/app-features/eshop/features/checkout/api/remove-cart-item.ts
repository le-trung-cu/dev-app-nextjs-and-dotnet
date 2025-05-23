import { clients } from "@/lib/clients"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({tenantId, userId, data}: {tenantId:string, userId: string, data: {
      productId: string;
    }}) => {
      const response = clients.delete(`/api/eshop/tenants/${tenantId}/basket/${userId}/items/${data.productId}`);
      return response;
    },
    onSuccess: (data, {tenantId, userId}) => {
      toast.success("Added item to cart");
      queryClient.invalidateQueries({queryKey: ["basket", tenantId, userId]})
    }
  });

  return mutation;
}