import { getCurrent } from "@/app-features/auth/actions";
import { redirect } from "next/navigation";
import ClientPage from "./client-page";

export default async function ChannelIdPage() {
  const current = await getCurrent();
  if (!current) redirect("/login");

  return (
    <>
      <ClientPage />
    </>
  );
}
