import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "../types";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (product: Product) => {
      const response = await clients.post(`/api/eshop/products`, {product});
      return response.data.isSuccess;
    },
    onSuccess: (data, {id}) => {
      toast.success("Create product success");
      queryClient.invalidateQueries({ queryKey: ["admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
