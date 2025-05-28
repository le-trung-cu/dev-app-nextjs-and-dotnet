import { useCurrentInfo } from "@/app-features/auth/api/use-current-info"

export const useOrganizationId = () => {
  const {} = useCurrentInfo();
}