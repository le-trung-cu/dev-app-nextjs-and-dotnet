import { TemplatesGallery } from "@/app-features/docs/features/documents/components/templates-gallery";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function DocsHomePage() {
  return (
    <div>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 pt-3 pb-3">
        <div className="flex items-center gap-2">
          <Image src="/docs.svg" width={20} height={30} alt="" className="" />
          <h1 className="text-xl font-bold">Docs</h1>
        </div>
        <label className="relative flex w-6/12 items-center">
          <Search className="absolute left-2 size-6" />
          <Input className="pl-9" placeholder="search your docs" />
        </label>
        <div></div>
      </div>
      <TemplatesGallery />
    </div>
  );
}
