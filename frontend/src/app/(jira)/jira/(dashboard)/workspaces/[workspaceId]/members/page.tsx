import { getCurrent } from "@/app-features/auth/actions";
import { MembersList } from "@/app-features/jira/features/members/components/members-list";
import { WorkspaceHeaderMembers } from "@/app-features/jira/features/members/components/workspace-header-members";
import { redirect } from "next/navigation";

export default async function MembersPage() {
  const current = await getCurrent();
  if (!current) redirect("/login");

  return (
    <>
      <WorkspaceHeaderMembers />
      <div className="mx-auto mt-10 w-full max-w-[800px]">
        <MembersList />
      </div>
    </>
  );
}
