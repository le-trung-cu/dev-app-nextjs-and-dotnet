"use client";

import { useCurrentInfo } from "@/app-features/auth/api/use-current-info";
import { useRemoveCartItem } from "@/app-features/eshop/features/checkout/api/remove-cart-item";
import { useAddCartItem } from "@/app-features/eshop/features/checkout/api/use-add-cart-item";
import { useGetBasket } from "@/app-features/eshop/features/checkout/api/use-get-basket";
import { useTenantId } from "@/app-features/eshop/features/tenants/hooks/use-tenant-id";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Minus, Plus, PlusIcon, Trash } from "lucide-react";
import { Fragment } from "react";

export default function Page() {
  const tenantId = useTenantId();
  const { data: user, isLoading: isLoadingUser } = useCurrentInfo();
  const { data: shoppingCart, isLoading } = useGetBasket({
    tenantId,
    userId: user?.user.id as string,
  });

  const { mutate: addCartItemApi } = useAddCartItem();
  const { mutate: removeCartItemApi } = useRemoveCartItem();

  if (isLoadingUser || isLoading) {
    return (
      <div className="container mx-auto mt-20 flex gap-20 px-5">
        <Loader2Icon className="animate-spin" />;
      </div>
    );
  }

  if (shoppingCart?.shoppingCart.items?.length === 0) {
    return (
      <div className="container mx-auto mt-20 flex gap-20 px-5">
        <p>Cart is empty</p>
      </div>
    );
  }

  function addCardItemHandler(data: {
    productId: string;
    color?: string | null;
  }) {
    addCartItemApi({
      tenantId,
      userId: user?.user.id as string,
      data: { ...data, quantity: 1 },
    });
  }

  function removeCardItemHandler(data: { productId: string }) {
    removeCartItemApi({
      tenantId,
      userId: user?.user.id as string,
      data: { ...data },
    });
  }

  return (
    <div className="container mx-auto mt-20 flex gap-20">
      <div className="flex-2 divide-y divide-solid rounded-md border border-black">
        {/* {JSON.stringify(shoppingCart)} */}
        {shoppingCart?.shoppingCart.items.map((item) => {
          return (
            <Fragment key={item.id}>
              <div className="px-5 py-10">
                <div>{item.productName}</div>
                <div>price: ${item.price}</div>
                <div className="flex items-stretch">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none"
                    onClick={() =>
                      removeCardItemHandler({ productId: item.productId })
                    }
                  >
                    <Trash />
                  </Button>
                  <div className="flex w-[80px] items-center justify-center border">
                    {item.quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none"
                    onClick={() =>
                      addCardItemHandler({
                        productId: item.productId,
                        color: item.color,
                      })
                    }
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="flex-1">
        <div className="rounded-md border border-black">
          <div className="flex justify-between border-b p-5">
            <span>Total</span>
            <span>${shoppingCart?.total}</span>
          </div>
          <div className="p-5">
            <Button className="w-full">Checkout</Button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
