"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteToken } from "../hooks/use-invite-token";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useGetWorkspaceById } from "../../workspaces/api/use-get-workspace-by-id";

export const JoinWorkspaceForm = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteToken = useInviteToken()!;
  const { data: workspace } = useGetWorkspaceById({ workspaceId });

  const { mutate: joinWorkspaceApi, isPending: isJoining } = useJoinWorkspace();

  const onJoinWorkspaceSubmit = () => {
    joinWorkspaceApi(
      { workspaceId, inviteToken },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}`);
        },
      }
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join workspace</CardTitle>
        <CardDescription className="text-muted-foreground">
          You&apos;ve been invited to{" "}
          <span className="font-bold"> {workspace?.name} </span> workspace{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-5" />
        <div className="flex flex-col gap-5 items-stretch">
          <Button
            variant="outline"
            disabled={isJoining}
            onClick={() => router.push("/jira/workspaces")}
          >
            Cancel
          </Button>
          <Button disabled={isJoining} onClick={onJoinWorkspaceSubmit}>
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
