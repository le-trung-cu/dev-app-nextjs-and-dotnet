import { Button } from "@/components/ui/button";
import { collections } from "./_components/_data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-grow p-5">
      <h1 className="text-4xl font-bold">Collections</h1>
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-5 mt-5 md:grid-cols-3">
        {collections.navMain[0].items.map((item) => (
          <div key={item.url} className="p-4 border rounded-sm relative min-h-[100px]">
            <h2 className="font-bold">{item.title}</h2>
            <Button asChild variant="ghost" size="icon" className="absolute right-0 top-0">
              <Link href={item.url}>
                <PlusCircle className="size-6 text-gray-500 "/>
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
