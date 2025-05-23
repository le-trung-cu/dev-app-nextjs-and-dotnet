import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  Navbar,
  NavbarSkeleton,
} from "../../../../../../../../app-features/eshop/features/tenants/components/navbar";
import { Suspense } from "react";
import { prefetchTenant } from "@/app-features/eshop/features/tenants/api/use-get-tenant";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenantId: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { tenantId } = await params;
  const queryClient = new QueryClient();
  prefetchTenant(queryClient, { tenantId });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar tenantId={tenantId} />
        </Suspense>
      </HydrationBoundary>
      {children}
    </div>
  );
}
