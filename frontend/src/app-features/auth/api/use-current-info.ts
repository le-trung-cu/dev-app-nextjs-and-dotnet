import { useQuery } from "@tanstack/react-query";
import { AuthenticateType } from "../types";
import { clients } from "@/lib/clients";

export const useCurrentInfo = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      if (!clients.defaults.headers.common["Authorization"]) {
        return null;
      }

      const response = await clients.get<{
        user: AuthenticateType["user"];
        appClaims: AppClaimsType;
      }>("/api/auth/info");

      const user = response.data.user;
      const appClaims = response.data.appClaims;

      return {
        user,
        appClaims,
        isRequiredConfirmEmail: !user.emailConfirmed,
      };
    },
  });

  return query;
};

type AppClaimsType =  Record<string, string> & {
  app_docs_organization: string;
}