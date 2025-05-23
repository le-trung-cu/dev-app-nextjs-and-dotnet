"use client";
import { useGetProducts } from "@/app-features/eshop/features/products/api/use-get-products";
import { useGetTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import { useGetTenants } from "@/app-features/eshop/features/tenants/api/use-get-tenants";
import { DataTable } from "@/app-features/eshop/features/products/components/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAdminGetProducts } from "@/app-features/eshop/features/products/api/use-admin-get-products";

export default function Page() {
  var { data } = useAdminGetProducts();
  return (
    <div className="flex-grow p-5">
      <div className="flex items-center space-x-5">
        <h1 className="text-4xl font-bold">Products</h1>
        <Button size="sm" asChild>
          <Link href="/eshop/admin/collections/products/new">Create New</Link>
        </Button>
      </div>
      <div>
        <DataTable products={data ?? []} />
      </div>
    </div>
  );
}
