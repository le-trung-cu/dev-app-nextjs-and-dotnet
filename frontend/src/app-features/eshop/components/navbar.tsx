"use client";
import { Button } from "@/components/ui/button";
import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";

const navbarItems = [
  { text: "home", href: "/eshop" },
  { text: "Features", href: "/eshop/features" },
  { text: "Pricing", href: "/eshop/pricing" },
  { text: "Contact", href: "/eshop/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="container mx-auto flex  items-center justify-between px-5 py-5 lg:py-0">
      <h1 className="text-3xl font-bold">Eshop</h1>
      <div className="hidden lg:flex justify-center space-x-10">
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
        <Button asChild variant="link">
          <Link href="/login" className={cn(poppins.className)}>
            Login
          </Link>
        </Button>
        <Button asChild className="rounded-none py-8">
          <Link href="" className={cn(poppins.className)}>
            Start Selling
          </Link>
        </Button>
      </div>
      <div className="lg:hidden">
        <NavbarSidebar/>
      </div>
    </nav>
  );
};
