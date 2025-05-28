import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { initeMembersSchema } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useInviteMembers = () => {
  const mutation = useMutation({
    mutationFn: async (
      data: z.infer<typeof initeMembersSchema> & {
        organizationId: string;
      },
    ) => {
      const response = await clients.put<{
        isSuccess: boolean;
        organizationId: string;
      }>("/api/docs/organizations/members/invite", data);
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: () => {
      toast.success("Send invitations success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
