import { useParams } from "next/navigation"

export const useTenantId = () => {
  const {tenantId} = useParams();
  return tenantId as string;
}