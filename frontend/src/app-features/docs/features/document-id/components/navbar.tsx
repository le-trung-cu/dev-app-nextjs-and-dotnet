import Image from "next/image";
import { MenuBar } from "./menu-bar";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex gap-3">
      <Link href="/docs">
        <Image src="/docs.svg" width={28} height={65} alt="" />
      </Link>
      <div className="">
        <h1  className="font-semibold text-lg" tabIndex={1}>Document title</h1>
        <MenuBar />
      </div>
    </div>
  );
};
