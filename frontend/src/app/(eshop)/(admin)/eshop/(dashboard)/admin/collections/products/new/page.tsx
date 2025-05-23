"use client";

import { useGetCategories } from "@/app-features/eshop/features/categories/api/use-get-categories";
import { useAdminGetProducts } from "@/app-features/eshop/features/products/api/use-admin-get-products";
import { useGetProduct } from "@/app-features/eshop/features/products/api/use-get-product-by-id";
import { CreateProductForm } from "@/app-features/eshop/features/products/components/create-product-form";
import { EditProductForm } from "@/app-features/eshop/features/products/components/edit-product-form";
import { useProductId } from "@/app-features/eshop/features/products/hooks/use-product-id";
import { useGetTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import { useGetTenants } from "@/app-features/eshop/features/tenants/api/use-get-tenants";
import { EditTenantForm } from "@/app-features/eshop/features/tenants/components/edit-tenant-form";
import { useTenantId } from "@/app-features/eshop/features/tenants/hooks/use-tenant-id";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Loader } from "lucide-react";

export default function Page() {
  const {data: categories, isLoading} = useGetCategories();
  const {data: tenants, isLoading: isLoadingTeant} = useGetTenants();

  if (isLoading || isLoadingTeant)
    return (
      <div className="h-[200px] flex-gsrow">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex-grow">
      <CreateProductForm categories={categories} initialValues={{tenantId: tenants[0].id}}/>
    </div>
  );
}
