import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const pages = [
  {
    name: "Jira",
    href: "/jira",
  },
  {
    name: "slack",
    href: "/slack",
  },
  {
    name: "docs",
    href: "/docs",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto pt-20">
      <div className="flex gap-10">
        {pages.map((item) => {
          return (
            <Card key={item.name}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
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
