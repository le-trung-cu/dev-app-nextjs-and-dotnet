import MyTasksPageClient from "./my-task-page-client";
import { getCurrent } from "@/app-features/auth/actions";
import { WorkspaceHeaderMyTasks } from "@/app-features/jira/features/tasks/components/workspace-header-my-tasks";
import { redirect } from "next/navigation";

export default async function MyTasksPage() {
  const current = await getCurrent();
  if (!current) redirect("/login");

  return (
    <div>
      <WorkspaceHeaderMyTasks />
      <div className="h-5"></div>
      <MyTasksPageClient currentUserId={current.user.id} />
    </div>
  );
}
