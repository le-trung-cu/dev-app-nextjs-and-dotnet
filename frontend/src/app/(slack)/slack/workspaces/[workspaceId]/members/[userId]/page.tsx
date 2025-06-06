import { getCurrent } from "@/app-features/auth/actions";
import { redirect } from "next/navigation";
import { MemberIdClient } from "./client";

export default async function MemberIdPage() {
  const current = await getCurrent();

  if(!current) redirect("/login");

  return (
    <MemberIdClient/>
  )
}