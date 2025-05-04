import { createColumnHelper } from "@tanstack/react-table";
import { Document } from "../types";
type DataType = { document: Document;};
const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.accessor("document.title", {
    header: "Name",
  }),
];
