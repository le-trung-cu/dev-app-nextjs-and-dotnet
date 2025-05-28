import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiException } from "@/app-features/exceptions/ApiException";
import { swichesOrganization } from "../actions";
import { useRouter } from "next/navigation";
import { clients } from "@/lib/clients";

export const useSwichesOrganization = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: { organizationId: string | null }) => {
      const response = await swichesOrganization(data);
      if (!response?.token) {
        throw new Error("Has some error");
      }
      clients.defaults.headers.common["Authorization"] =
        `Bearer ${response.token}`;
      return true;
    },
    onError: (error) => {
      if (error instanceof ApiException) {
        toast.error(error.title, { description: error.detail });
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.info("Swiches organization success");
      router.refresh(),
        // queryClient.invalidateQueries({ queryKey: ["current"] });
        queryClient.invalidateQueries();
    },
  });

  return mutation;
};
