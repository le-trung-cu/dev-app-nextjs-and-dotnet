import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "../types";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (product: Product) => {
      const response = await clients.put(`/api/eshop/products`, product);
      return response.data.isSuccess;
    },
    onSuccess: (data, {id}) => {
      toast.success("Update product success");
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
