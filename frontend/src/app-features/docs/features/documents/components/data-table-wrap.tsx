"use client";
import { DataTable } from "./data-table";
import { useGetDocuments } from "../api/use-get-documents";
import { useSearchParam } from "@/app-features/docs/hooks/use-search-param";
import { Loader } from "lucide-react";

export const DataTableWrap = () => {
  const [search] = useSearchParam();
  const { data, isPending } = useGetDocuments({ search });
  if(isPending) {
    return <Loader className="animate-spin"/>
  }
  return <div className="max-w-screen-xl mx-auto mt-10">
    <DataTable documents={data}/>
  </div>;
};
