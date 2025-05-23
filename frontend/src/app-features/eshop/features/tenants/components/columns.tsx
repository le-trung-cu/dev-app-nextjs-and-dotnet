import { createColumnHelper } from "@tanstack/react-table";
import { Tenant } from "../types";
import { TenantAvatar } from "./tenant-avatar";
import Link from "next/link";
import { generateTenantURL } from "@/lib/utils";
import { NEXT_PUBLIC_SEFL_HOST_ADDRESS } from "@/constant";

type DataType = { tenant: Tenant};
const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.accessor("tenant.name", {
    header: "Name",
  }),
  columnHelper.accessor("tenant.slug", {
    header: "Slug",
    cell: (info) => {
      const id = info.row.original.tenant.id;
      const slug = info.getValue();
      return (
        <Link href={`${NEXT_PUBLIC_SEFL_HOST_ADDRESS}/eshop/admin/collections/tenants/${id}`}>{slug}</Link>
      )
    }
  }),
  columnHelper.accessor("tenant.image", {
    header: "image",
    cell: (info) => {
      const image = info.getValue();
      return !!image ? (
        <div className="flex items-center">
          <TenantAvatar imgUrl={image.path} name={image.name} className="mr-2.5 size-10" />
        </div>
      ) : null;
    },
  }),
];
