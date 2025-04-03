import MyTasksPageClient from "./my-task-page-client";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default  async function MyTasksPage() {
  const current = await getCurrent();
  if(!current) redirect("/login");

  return <div>
     <MyTasksPageClient currentUserId={current.user.id}/>
  </div>
}