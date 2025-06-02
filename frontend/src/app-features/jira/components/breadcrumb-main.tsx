import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";

type BreadcrumbMainProps = {
  items: { href?: string; text?: string; icon?: React.ReactNode }[];
};
export const BreadcrumbMain = ({ items }: BreadcrumbMainProps) => {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>
                        <span className="inline-flex items-center space-x-2">
                          {item.icon} <span>{item.text}</span>
                        </span>
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      <span className="inline-flex items-center space-x-2">
                        {item.icon}
                        <span>{item.text}</span>
                      </span>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
