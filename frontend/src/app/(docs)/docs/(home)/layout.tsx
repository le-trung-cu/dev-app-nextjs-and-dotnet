import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Docs",
  description: "Docs Home",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
}
