"use client";

import { useGetChannels } from "@/app-features/slack/features/channels/api/use-get-channels";
import { useCreateChannelDialog } from "@/app-features/slack/features/channels/hooks/use-create-channel-dialog";
import { useGetCurrentMember } from "@/app-features/slack/features/members/api/use-get-current-member";
import { useGetWorkspace } from "@/app-features/slack/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/app-features/slack/features/workspaces/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WorkpsaceIdPage() {
  const router = useRouter();
  const [open, setOpen] = useCreateChannelDialog();
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useGetCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    workspaceId,
  });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const isLoading = workspaceLoading || channelsLoading || memberLoading;
  const channelId = channels?.[0]?.id;
  const isAdmin = member?.role == "Admin";

  useEffect(() => {
    if (isLoading || !workspace) return;
    if (channelId) {
      if (open) {
        setOpen(false);
      }
      router.replace(`/slack/workspaces/${workspaceId}/channels/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    isLoading,
    workspaceId,
    workspace,
    channelId,
    router,
    setOpen,
    open,
    isAdmin,
  ]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <Loader className="text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
        <TriangleAlert className="text-muted-foreground" />
        <span className="text-muted-foreground text-sm">
          Workspace not found
        </span>
      </div>
    );
  }

  if (!channelId) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
        <TriangleAlert className="text-muted-foreground" />
        <span className="text-muted-foreground text-sm">Channel not found</span>
      </div>
    );
  }
  return null;
}
