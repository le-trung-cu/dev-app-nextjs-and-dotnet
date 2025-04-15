import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { registerSchema } from "../types";
import { registerAction } from "../actions";
import { ApiException } from "@/app-features/exceptions/ApiException";
import { toast } from "sonner";

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      const response = await registerAction(data);
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
