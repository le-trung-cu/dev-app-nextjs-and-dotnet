"use client";
import { Loader, MessageCircleMoreIcon } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VerificationInput } from "./verification-input";
import { useJoinWorkspace } from "../../members/api/user-join-workspace";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useGetWorkspaceInfo } from "../api/use-get-workspace-info";

export const JoinWorkspaceForm = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { data: workspace, isPending: isGetworkspacePending } =
    useGetWorkspaceInfo({ workspaceId });

  const { mutate, isPending } = useJoinWorkspace();

  const onVerificationInputComplete = useCallback(
    (inviteCode: string) => {
      mutate(
        { workspaceId, inviteCode },
        {
          onSuccess: () => {
            router.push(`/slack/workspaces/${workspaceId}`);
          },
        },
      );
    },
    [workspaceId, mutate, router],
  );

  if (isGetworkspacePending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if (!workspace) {
    throw new Error("Workspace not found");
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <MessageCircleMoreIcon className="size-[80px]" />
      <h2 className="text-2xl font-bold">Join {workspace.name}</h2>
      <p className="text-muted-foreground mb-7">
        Enter the workspace code to join
      </p>
      <VerificationInput
        onComplete={onVerificationInputComplete}
        disabled={isPending}
      />
      <Button variant="outline" asChild className="mt-10 h-[60px] w-[220px]">
        <Link href="/slack">Back to home</Link>
      </Button>
    </div>
  );
};
