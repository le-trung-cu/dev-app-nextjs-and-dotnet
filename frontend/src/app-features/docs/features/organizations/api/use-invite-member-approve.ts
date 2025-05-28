import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInviteMemberApprove = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { organizationId: string }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        "/api/docs/organizations/members/invite-approve",
        data,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }
    },
    onSuccess: () => {
      toast.success("You have joined organization success");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
