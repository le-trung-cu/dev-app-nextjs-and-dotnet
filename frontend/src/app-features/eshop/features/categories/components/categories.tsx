"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Category } from "../type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { usePathname } from "next/navigation";

type Props = {
  data: Category[];
};

export const Categories = ({ data }: Props) => {
  const pathname = usePathname();
  return (
    <div data-id="categories">
      <div className="flex gap-2 px-5 pb-2">
        {data?.map((item) => {
          const isActive = pathname.includes(`/eshop/${item.slug}/`) || pathname === `/eshop/${item.slug}`;

          if (item.subcategories.length === 0) {
            return (
              <Button
                asChild
                key={item.id}
                variant={isActive? "default" : "outline"}
                className="rounded-full border-r-[2px] border-b-[3px] border-l-[2px] border-black"
              >
                <Link href={`/eshop/${item.slug}`}>{item.name}</Link>
              </Button>
            );
          }
          return (
            <HoverCard key={item.id}>
              <HoverCardTrigger asChild>
                <Button
                  asChild
                  key={item.id}
                  variant={isActive? "default" : "outline"}
                  className="rounded-full border-t border-r-[2px] border-b-[3px] border-l-[2px] border-black hover:cursor-pointer"
                >
                  <Link href={`/eshop/${item.slug}`}>{item.name}</Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                {item.subcategories.map((sub) => (
                  <div key={sub.id} className="py-2">
                    <Link
                      href={`/eshop/${item.slug}/${sub.slug}`}
                      className="text-base hover:underline"
                    >
                      {sub.name}
                    </Link>
                  </div>
                ))}
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
};
