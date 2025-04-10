"use client";
import { useGetWorkspaces } from "@/slack/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceDialog } from "@/slack/features/workspaces/hooks/use-create-workspace-dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SlackHomePageClient () {
  const [open, setOpen] = useCreateWorkspaceDialog();

  const {data: workspaces, isLoading} = useGetWorkspaces();
  const workpsaceId = workspaces?.[0]?.id;
  const router = useRouter();
  useEffect(() => {
    if(isLoading) return;
    if(workpsaceId) {
      //TODO: redirect to workspace
      router.replace(`/slack/workspaces/${workpsaceId}`)
    } else if(!open){
      setOpen(true);
    }
  }, [workpsaceId, isLoading, open, setOpen, router]);

  return <h1>Home</h1>
}