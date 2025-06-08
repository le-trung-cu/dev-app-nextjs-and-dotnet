"use client";
import { useGetTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import { useGetTenants } from "@/app-features/eshop/features/tenants/api/use-get-tenants";
import { DataTable } from "@/app-features/eshop/features/tenants/components/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
  var { data: tenants } = useGetTenants();
  return (
    <div className="flex-grow p-5">
      <div className="flex items-center space-x-5">
        <h1 className="text-4xl font-bold">Tenants</h1>
        <Button size="sm" asChild>
          <Link href="/eshop/admin/collections/tenants/new">Create New</Link>
        </Button>
      </div>
      <div>
        <DataTable tenants={tenants ?? []}/>
      </div>
    </div>
  );
}
