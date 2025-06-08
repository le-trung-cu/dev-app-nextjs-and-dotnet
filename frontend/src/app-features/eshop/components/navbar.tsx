"use client";
import { Button } from "@/components/ui/button";
import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTenantForm } from "../features/tenants/components/create-tenant-form";
import { useState } from "react";
import { useGetTenant } from "../features/tenants/api/use-get-tenant";
import { useGetTenants } from "../features/tenants/api/use-get-tenants";
import { useCurrentInfo } from "@/app-features/auth/api/use-current-info";
import {
  Authenticated,
  Unauthenticated,
} from "@/app-features/auth/components/authenticate-provider";

const navbarItems = [
  { text: "home", href: "/eshop" },
  { text: "Features", href: "/eshop/features" },
  { text: "Pricing", href: "/eshop/pricing" },
  { text: "Contact", href: "/eshop/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { data: tenants } = useGetTenants();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const onStartSelling = () => {
    if (tenants && tenants.length > 0) {
      router.push(`/eshop/admin`);
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <>
      <nav className="container mx-auto flex min-h-[60px] items-center justify-between px-5 py-5 lg:py-0">
        <h1 className="text-3xl font-bold">Eshop</h1>
        <div className="hidden justify-center space-x-10 lg:flex">
          {navbarItems.map((item) => {
            const isActive = pathname == item.href;
            return (
              <div key={item.href}>
                <Button
                  asChild
                  className={cn("rounded-full")}
                  size="lg"
                  variant={isActive ? "default" : "ghost"}
                >
                  <Link
                    className={cn("font-semibold", poppins.className)}
                    href={item.href}
                  >
                    {item.text}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
        <div className="hidden lg:block">
          <Unauthenticated>
            <Button asChild variant="link">
              <Link href="/login" className={cn(poppins.className)}>
                Login
              </Link>
            </Button>
          </Unauthenticated>
          <Authenticated>
            <Button
              className={cn(
                poppins.className,
                "cursor-pointer rounded-none py-8",
              )}
              onClick={onStartSelling}
            >
              Start Selling
            </Button>
          </Authenticated>
        </div>
        <div className="lg:hidden">
          <NavbarSidebar />
        </div>
      </nav>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <DialogHeader>Create a shop</DialogHeader>
            <DialogDescription>
              Create your first shop before start selling your products
            </DialogDescription>
          </DialogTitle>
          <CreateTenantForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
