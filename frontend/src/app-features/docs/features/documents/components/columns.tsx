import { createColumnHelper } from "@tanstack/react-table";
import { Document } from "../types";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { DocumentMenu } from "./document-menu";
type DataType = { document: Document };
const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.accessor("document.title", {
    header: "Name",
    cell: (info) => {
      return (
        <div className="flex items-center gap-2">
          <SiGoogledocs /> {info.getValue()}
        </div>
      );
    },
  }),
  columnHelper.accessor("document.organizationId", {
    header: "Shared",
    cell: (info) => {
      return !!info.getValue() ? (
        <Building2Icon className="size-4" />
      ) : (
        <CircleUserIcon className="size-4" />
      );
    },
  }),
  columnHelper.accessor("document.createdAt", {
    header: "Created At",
    cell: (info) => {
      return format(info.getValue(), "MMM dd, yyyy");
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => {
      const { id, title } = info.row.original.document;
      return (
        <DocumentMenu
          title={title}
          documentId={id}
          onNewTab={() => window.open(`/docs/documents/${id}`, "_blank")}
        />
      );
    },
  }),
];
