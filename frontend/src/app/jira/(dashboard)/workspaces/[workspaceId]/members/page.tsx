import { getCurrent } from "@/features/auth/actions";
import { MembersList } from "@/jira/features/members/components/members-list";
import { redirect } from "next/navigation";

export default async function MembersPage() {
  const current = await getCurrent();
  if (!current) redirect("/login");

  return (
    <div className="w-full max-w-[800px] mx-auto mt-10">
      <MembersList />
    </div>
  );
}
