import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  return (
    <div className="">
      <div className="container mx-auto px-5 py-5">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-2 text-gray-500" />
          <Input placeholder="search product" className="h-[60px] pl-10 rounded-none border-black" />
        </div>
      </div>
    </div>
  );
};
