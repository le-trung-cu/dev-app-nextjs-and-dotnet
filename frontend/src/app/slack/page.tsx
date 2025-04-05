import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import SlackHomePageClient from "./slack-home-page-client";

export default async function SlackHomePage() {
  const current = await getCurrent();
  if(!current) redirect("/login");
  return <SlackHomePageClient/>;
}