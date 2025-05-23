import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useAddCartItem } from "../api/use-add-cart-item";

export const AddToCartButton = ({
  tenantId,
  userId,
  productId,
  color,
}: {
  tenantId: string;
  userId?: string;
  productId: string;
  color?: string;
}) => {
  const { mutate: addCartItemApi } = useAddCartItem();
  function addToCartHandler() {
    addCartItemApi({
      tenantId,
      userId,
      data: { productId, quantity: 1, color: color ?? "" },
    });
  }

  return (
    <Button onClick={addToCartHandler}>
      Add to cart <ShoppingCartIcon />
    </Button>
  );
};
