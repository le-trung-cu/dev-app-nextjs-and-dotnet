"use client";

import { useGetCategories } from "@/app-features/eshop/features/categories/api/use-get-categories";
import { useAdminGetProducts } from "@/app-features/eshop/features/products/api/use-admin-get-products";
import { useGetProduct } from "@/app-features/eshop/features/products/api/use-get-product-by-id";
import { EditProductForm } from "@/app-features/eshop/features/products/components/edit-product-form";
import { useProductId } from "@/app-features/eshop/features/products/hooks/use-product-id";
import { useGetTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import { EditTenantForm } from "@/app-features/eshop/features/tenants/components/edit-tenant-form";
import { useTenantId } from "@/app-features/eshop/features/tenants/hooks/use-tenant-id";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Loader } from "lucide-react";

export default function Page() {
  const productId = useProductId();
  const {data, isLoading} = useGetProduct({productId});
  const {data: categories} = useGetCategories();  
  if (isLoading)
    return (
      <div className="h-[200px] flex-gsrow">
        <Loader className="animate-spin" />
      </div>
    );

  if (!data) {
    throw new Error("Tenant not found");
  }
  return (
    <div className="flex-grow">
      <EditProductForm categories={categories} initialValues={data} />
    </div>
  );
}
