import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const pages = [
  {
    name: "Jira",
    href: "/jira",
    images: [
      '/jira-01.png',
      '/jira-02.png',
      '/jira-03.png',
      '/jira-04.png',
    ]
  },
  {
    name: "slack",
    href: "/slack",
    images: [
      '/slack-01.png',
      '/slack-02.png',
    ]
  },
  {
    name: "docs",
    href: "/docs",
    images: [
      '/docs-02.png',
      '/docs-03.png',
    ]
  },
  {
    name: "Eshop",
    href: "/eshop",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto pt-20">
      <div className="grid grid-cols-2 gap-10">
        {pages.map((item) => {
          return (
            <Card key={item.name}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {item.images?.map(img => (
                      <CarouselItem key={img} className="relative h-[400px]">
                        <Image src={img} fill alt=""/>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={item.href}>Go to</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
