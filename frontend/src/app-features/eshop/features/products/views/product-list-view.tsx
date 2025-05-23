import { Suspense } from "react";

import { ProductSort } from "../components/product-sort";
import { ProductFilters } from "../components/product-filters";
import {
  GridProducts,
  GridProductsSkeleton,
} from "../components/grid-products";

interface Props {
  categoryId?: string;
  tenantId?: string;
  narrowView?: boolean;
}

export const ProductListView = ({
  categoryId,
  tenantId,
  narrowView,
}: Props) => {
  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 py-8 lg:px-12">
      <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:items-center lg:gap-y-0">
        <p className="text-2xl font-medium">Curated for you</p>
        <ProductSort />
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<GridProductsSkeleton narrowView={narrowView} />}>
            <GridProducts
              categoryId={categoryId}
              tenantId={tenantId}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
