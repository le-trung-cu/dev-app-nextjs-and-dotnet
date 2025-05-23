"use client";

import Image from "next/image";
import {
  useGetProducts,
  useGetProductsInfinitie,
} from "../api/use-get-products";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProductFilters } from "../hooks/use-product-filters";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { cn } from "@/lib/utils";
import { DEFAULT_LIMIT } from "@/app-features/eshop/constants";

interface Props {
  categoryId?: string;
  tenantId?: string;
  narrowView?: boolean;
}

export const GridProducts = ({ categoryId, tenantId, narrowView }: Props) => {
  const [filters] = useProductFilters();

  const { data } = useGetProductsInfinitie({ tenantId, categoryId });

  const router = useRouter();

  return (
    <div className="container mx-auto mt-20">
      <div className="grid grid-cols-1 content-center gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        {/* {JSON.stringify(data)} */}
        {data.pages
          .flatMap((page) => page.data)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.path}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant?.image?.path}
              reviewRating={product.reviewRating}
              reviewCount={product.reviewCount}
              price={product.price}
            />
          ))}
        {/* {products.map((item) => {
          const href = `/eshop/tenants/${item.tenantId}/products/${item.id}`;
          return (
            <div
              key={item.id}
              className="bg-base-100 border border-black p-5 shadow-xl"
              onClick={() => router.push(href)}
            >
              <figure>
                <img
                  alt="You Ain't Seen Nothin' Yet"
                  loading="lazy"
                  width="384"
                  height="140"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                />
              </figure>
              <div className="card-body">
                <div className="text-sm text-slate-500">
                  Humanities &amp; Social Sciences
                </div>
                <h2 className="card-title">{item.name}</h2>
                <p className="font-medium text-slate-500">Casey Cruickshank</p>
                <div className="rating rating-sm rating-half">
                  <input
                    type="radio"
                    name=":r6:-rating-0-half"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    disabled
                    value="0.5"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-0-full"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    disabled
                    value="1"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-1-half"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    disabled
                    value="1.5"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-1-full"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    disabled
                    value="2"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-2-half"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    disabled
                    value="2.5"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-2-full"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    disabled
                    value="3"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-3-half"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    disabled
                    value="3.5"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-3-full"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    disabled
                    value="4"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-4-half"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    disabled
                    value="4.5"
                  />
                  <input
                    type="radio"
                    name=":r6:-rating-4-full"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    disabled
                    value="5"
                  />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn">
                    ${item.price}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      ></path>
                    </svg>
                  </button>
                  <a className="btn btn-info" href="/book/1">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export const GridProductsSkeleton = ({ narrowView }: Props) => {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
      narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
    )}>
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
