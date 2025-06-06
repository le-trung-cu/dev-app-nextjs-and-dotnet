import { useParams } from "next/navigation";

export const useUserId = () => {
  const { userId } = useParams();
  return userId as string;
};
