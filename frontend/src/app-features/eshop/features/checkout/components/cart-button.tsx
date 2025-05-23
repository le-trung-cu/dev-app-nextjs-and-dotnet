"use client";
import { Button } from "@/components/ui/button";
import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useGetBasket } from "../api/use-get-basket";
import { useTenantId } from "../../tenants/hooks/use-tenant-id";
import { useCurrentInfo } from "@/app-features/auth/api/use-current-info";

export const CartButton = () => {
  const tenantId = useTenantId();
  const {data: user} = useCurrentInfo({});
  const {data: basket} = useGetBasket({tenantId, userId: user?.user.id!, });
  
  return (
    <Button asChild className="size-16 rounded-none">
      <Link href={`/eshop/tenants/${tenantId}/checkout`} className={cn(poppins.className)}>
        <ShoppingCart />
        <span>{basket?.count}</span>
      </Link>
    </Button>
  );
};
