import { prefetchCategories } from "@/app-features/eshop/features/categories/api/use-get-categories";
import { prefetchProducts } from "@/app-features/eshop/features/products/api/use-get-products";
import { GridProducts } from "@/app-features/eshop/features/products/components/grid-products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function PrefetchData({children}: {children: React.ReactNode}) {
  const queryClient = new QueryClient();

  const f1 = prefetchProducts(queryClient);
  const f2 = prefetchCategories(queryClient);
  await Promise.all([f1, f2]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}