// import { clients } from "@/lib/clients"
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { loginSchema } from "../types";
import { toast } from "sonner";
import { loginAction } from "../actions";
import { ApiException } from "@/features/exceptions/ApiException";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await loginAction(data);
      if (response.title === "Exception") {
        throw new ApiException(response);
      }
      return "OK";
    },
    onError: (error) => {
      if (error instanceof ApiException) {
        toast.error(error.title, { description: error.detail });
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Register success");
    },
  });

  return mutation;
};
