"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProduct } from "../api/use-get-product-by-id";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { AddToCartButton } from "../../checkout/components/add-to-cart-button";
import { useTenantId } from "../../tenants/hooks/use-tenant-id";
import { useProductId } from "../hooks/use-product-id";
import { useCurrentInfo } from "@/app-features/auth/api/use-current-info";

export const ProductDetail = ({ productId }: { productId: string }) => {
  const { data: product } = useGetProduct({ productId });
  const tenantId = useTenantId();
  const { data: user } = useCurrentInfo({});

  return (
    <div className="container mx-auto px-5 pt-20">
      {JSON.stringify(product)}
      <div className="border border-black p-5 shadow">
        <figure>
          <img src={null as unknown as string} />
        </figure>
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p>
            <span className="">Price:</span>{" "}
            <span className="font-bold">{product.price}$</span>
          </p>
          <AddToCartButton
            productId={productId}
            tenantId={tenantId}
            userId={user?.user.id}
          />
        </div>
      </div>

      <section>
        <h2>Customer Reviewa</h2>
      </section>
    </div>
  );
};
