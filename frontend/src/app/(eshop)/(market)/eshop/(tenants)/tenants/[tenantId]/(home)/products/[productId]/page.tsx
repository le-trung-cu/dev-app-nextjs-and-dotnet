import { prefetchProduct } from "@/app-features/eshop/features/products/api/use-get-product-by-id";
import { ProductDetail } from "@/app-features/eshop/features/products/components/product-detail";
import {
  ProductView,
  ProductViewSkeleton,
} from "@/app-features/eshop/features/products/views/product-view";
import { prefetchTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    tenantId: string;
    productId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { tenantId, productId } = await params;
  const queryClient = new QueryClient();
  await prefetchProduct(queryClient, { productId });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView tenantId={tenantId} productId={productId} />
      </Suspense>
    </HydrationBoundary>
  );
}
