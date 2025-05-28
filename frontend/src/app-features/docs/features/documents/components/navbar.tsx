import Image from "next/image";
import { MenuBar } from "./menu-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsCloudCheck } from "react-icons/bs";
import { DocumentInput } from "./document-input";
import { useDocumentId } from "../hooks/use-document-id";
import { Document } from "../types";
import { UserButton } from "@/app-features/auth/components/user-button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwicher } from "../../organizations/components/organization-swicher";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";

export const Navbar = ({ data }: { data: Document }) => {
  return (
    <div className="flex items-center gap-3 pt-1">
      <Link href="/docs">
        <Image src="/docs.svg" width={28} height={65} alt="" />
      </Link>
      <div className="">
        <DocumentInput documentId={data.id} title={data.title} />
        <MenuBar />
      </div>
      <div className="ml-auto flex items-center gap-2">
        {/* <Avatars />
        <Inbox/> */}
        <OrganizationSwicher />
        <UserButton className="size-10" />
      </div>
    </div>
  );
};

export const NavBarSkeleton = () => {
  return (
    <div className="flex h-[56px] items-center gap-3 pt-1">
      <Link href="/docs">
        <Image src="/docs.svg" width={28} height={65} alt="" />
      </Link>
      <div className="py-1">
        <Skeleton className="h-[22px] w-[200px]" />
        <MenuBar />
      </div>
      <UserButton className="ml-auto" />
    </div>
  );
};
