"use client";
import { CartButton } from "@/app-features/eshop/features/checkout/components/cart-button";
import { useTenantId } from "@/app-features/eshop/features/tenants/hooks/use-tenant-id";
import { Button } from "@/components/ui/button";
import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarItems = [
  { text: "home", href: "/eshop" },
  { text: "Features", href: "/eshop/features" },
  { text: "Pricing", href: "/eshop/pricing" },
  { text: "Contact", href: "/eshop/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const tenantId = useTenantId();
  return (
    <nav className="container mx-auto flex items-center justify-between px-5 py-5">
      <h1 className="text-3xl font-bold">Checkout</h1>
     
      <div className="">
        <Button asChild variant="outline" className="border-black">
          <Link href={`/eshop/tenants/${tenantId}`}>Continue Shopping</Link>
        </Button>
      </div>
     
    </nav>
  );
};
