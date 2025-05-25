"use client";
import { useGetWorkspaces } from "@/app-features/slack/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceDialog } from "@/app-features/slack/features/workspaces/hooks/use-create-workspace-dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SlackHomePageClient () {
  const [open, setOpen] = useCreateWorkspaceDialog();

  const {data: workspaces, isPending} = useGetWorkspaces();
  const workpsaceId = workspaces?.[0]?.id;
  const router = useRouter();
  useEffect(() => {
    if(isPending) return;
    if(workpsaceId) {
      //TODO: redirect to workspace
      router.replace(`/slack/workspaces/${workpsaceId}`)
    } else {
      setOpen(true);
    }
  }, [workpsaceId, isPending, setOpen, router]);

  return <div></div>
}