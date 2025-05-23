import { useQuery } from "@tanstack/react-query"
import { AuthenticateType } from "../types"
import { clients } from "@/lib/clients";

export const useCurrentInfo = ({authenticated}:{authenticated?: AuthenticateType | null}) => {
  const query = useQuery({
    // enabled: authenticated?.user?.emailConfirmed === false,
    queryKey: ["current"],
    queryFn: async () => {
      const response = await clients.get<{user: AuthenticateType["user"]}>("/api/auth/info");
      
      const user = response.data.user;

      return {
        user,
        isRequiredConfirmEmail: !user.emailConfirmed
      } 
    },
  });

  return query;
}