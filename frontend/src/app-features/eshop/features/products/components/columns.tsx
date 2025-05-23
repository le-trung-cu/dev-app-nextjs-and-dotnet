import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { generateTenantURL } from "@/lib/utils";
import { NEXT_PUBLIC_SEFL_HOST_ADDRESS } from "@/constant";
import { Product } from "../types";
import { ProductAvatar } from "./product-avatar";

type DataType = { product: Product};
const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.accessor("product.name", {
    header: "Name",
    cell: (info) => {
      const {product} = info.row.original;
      return (
        <Link href={`/eshop/admin/collections/products/${product.id}`}>{product.name}</Link>
      )
    }
  }),
  columnHelper.accessor("product.description", {
    header: "Description",
  }),
  columnHelper.accessor("product.price", {
    header: "Price",
  }),
  columnHelper.accessor("product.categories", {
    header: "Category",
    cell: (info) => {
      const categories = info.getValue().map(item => item.name).join(',')
      return <span>{categories}</span>
    }
  }),
  columnHelper.accessor("product.image", {
      header: "Image",
      cell: (info) => {
        const image = info.getValue();
        return !!image ? (
          <div className="flex items-center">
            <ProductAvatar imgUrl={image.path} name={image.name} className="mr-2.5 size-10" />
          </div>
        ) : null;
      },
    }),
];
