"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetCategories } from "../../../categories/api/use-get-categories";
import { Categories } from "../../../categories/components/categories";
import { SearchInput } from "./search-input";

export const SearchFilter = () => {
  const { data: categories } = useGetCategories();
  return (
    <div>
      <div className="container mx-auto">
        <SearchInput />
      </div>
      <div className="w-full">

      <ScrollArea>
        <div className="flex justify-center">
          <Categories data={categories} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      </div>
    </div>
  );
};
