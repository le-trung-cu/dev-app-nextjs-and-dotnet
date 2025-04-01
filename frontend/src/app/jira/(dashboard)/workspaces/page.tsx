import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { ClientWorkspacesPage } from "./client";

export default async function WorkspacesPage() {
  const current = await getCurrent();
  if(!current) redirect("/login");

  return <ClientWorkspacesPage/>
}