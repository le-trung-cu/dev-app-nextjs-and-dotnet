"use client";
import { useSearchParam } from "@/app-features/docs/hooks/use-search-param";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-6/12">
      <label className="relative flex w-full items-center">
        <Button className="absolute left-2 size-6 rounded-full" variant="ghost">
          <Search className="size-6" />
        </Button>
        <Input
          className="pl-9 placeholder:text-neutral-800 md:text-base"
          placeholder="search your docs"
          ref={inputRef}
          value={value}
          onChange={handleChange}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 size-8 rounded-full"
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        )}
      </label>
    </form>
  );
};
