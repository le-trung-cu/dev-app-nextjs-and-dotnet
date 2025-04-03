import { useSearchParams } from "next/navigation";

export const useInviteToken = () => {
  const params = useSearchParams();
  return params.get("inviteToken")
};
