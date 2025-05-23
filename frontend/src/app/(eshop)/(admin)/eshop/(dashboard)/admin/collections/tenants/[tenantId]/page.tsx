"use client";

import { useGetTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import { EditTenantForm } from "@/app-features/eshop/features/tenants/components/edit-tenant-form";
import { useTenantId } from "@/app-features/eshop/features/tenants/hooks/use-tenant-id";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Loader } from "lucide-react";

export default function Page() {
  const tenantId = useTenantId();
  const { data: tenant, isLoading } = useGetTenant({ tenantId });

  if (isLoading)
    return (
      <div className="h-[200px] flex-grow">
        <Loader className="animate-spin" />
      </div>
    );

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return (
    <div className="flex-grow">
      <EditTenantForm initialValues={tenant} />
    </div>
  );
}
