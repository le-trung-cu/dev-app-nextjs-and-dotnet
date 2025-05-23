import { useParams } from "next/navigation";

export const useProductId = () => {
  const {productId} = useParams();
  return productId as string;
}