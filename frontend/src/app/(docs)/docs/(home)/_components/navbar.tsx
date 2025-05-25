import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton } from "@/app-features/auth/components/user-button";

export const Navbar = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 pt-3 pb-3">
      <div className="flex items-center gap-2">
        <Image src="/docs.svg" width={20} height={30} alt="" className="" />
        <h1 className="text-xl font-bold">Docs</h1>
      </div>
      <SearchInput />
      <UserButton/>
    </div>
  );
};
