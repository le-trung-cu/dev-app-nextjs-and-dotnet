"use client";
import { CartButton } from "@/app-features/eshop/features/checkout/components/cart-button";
import { Button } from "@/components/ui/button";
import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTenantId } from "../hooks/use-tenant-id";
import { useGetTenant, useSuspenseGetTenant } from "../api/use-get-tenant";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  tenantId: string;
}
export const Navbar = ({ tenantId }: Props) => {
  const { data } = useSuspenseGetTenant({ tenantId });

  return (
    <nav className="container mx-auto flex items-center justify-between px-5 py-5 lg:py-0">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <div className="">
        <CartButton />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        <Button disabled className="bg-white">
          <ShoppingCartIcon className="text-black" />
        </Button>
      </div>
    </nav>
  );
};
