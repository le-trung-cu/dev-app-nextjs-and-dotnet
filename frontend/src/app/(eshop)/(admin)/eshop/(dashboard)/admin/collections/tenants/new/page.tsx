"use client";
import { CreateTenantForm } from "@/app-features/eshop/features/tenants/components/create-tenant-form";

export default function Page() {
  return (
    <div className="flex-grow p-10">
      <h1 className="text-4xl font-bold">Create new Tenant</h1>
      <div className="mt-16 max-w-lg">
        <CreateTenantForm />
      </div>
    </div>
  );
}
