import { prefetchProduct } from "@/app-features/eshop/features/products/api/use-get-product-by-id";
import { prefetchProductsInfinite } from "@/app-features/eshop/features/products/api/use-get-products";
import { GridProducts } from "@/app-features/eshop/features/products/components/grid-products";
import { ProductDetail } from "@/app-features/eshop/features/products/components/product-detail";
import { ProductListView } from "@/app-features/eshop/features/products/views/product-list-view";
import { prefetchTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { tenantId } = await params;
  const queryClient = new QueryClient();
  // prefetchProductsInfinite(queryClient, { tenantId });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantId={tenantId} narrowView/>
    </HydrationBoundary>
  );
}
