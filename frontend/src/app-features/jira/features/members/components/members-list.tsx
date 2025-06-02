"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, MoreVertical, Trash2 } from "lucide-react";
import { useGetMembers } from "../api/use-get-members";
import { MemberAvatar } from "./member-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useDeleteMember } from "../api/use-delete-member";
import { useUpdateMember } from "../api/use-update-member";
import { MemberRole } from "../types";
import { useConfirm } from "@/app-features/jira/hooks/use-confirm";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data: members } = useGetMembers({ workspaceId });
  const [ConfirmDialog, confirm] = useConfirm();

  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const handleUpdateMember = (userId: string, role: MemberRole) => {
    updateMember({ workspaceId, userId, role });
  };

  const handleDeleteMember = async (userId: string) => {
    const ok = await confirm({
      title: "Remove member?",
      description: "This action cannot be undone",
    });
    if (!ok) return;

    deleteMember({ workspaceId, userId });
  };
  return (
    <>
      <ConfirmDialog />
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Button asChild variant="outline" size="sm" className="mr-3">
              <Link href={`/jira/workspaces/${workspaceId}`}>
                <ArrowLeft /> Back
              </Link>
            </Button>
            <CardTitle>Members list</CardTitle>
            <CardDescription className="hidden" />
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-10 h-2" />
          {members?.map((item) => {
            return (
              <Fragment key={item.userId}>
                <div className="flex items-center py-5">
                  <MemberAvatar name={item.name} className="mr-3" />
                  <div>
                    <div className="font-bold">
                      {item.name}{" "}
                      <Badge variant="secondary" className="ml-3">
                        {item.role}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.email}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() =>
                          handleUpdateMember(item.userId, MemberRole.Admin)
                        }
                        disabled={isUpdatingMember}
                      >
                        Set as Administrator
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() =>
                          handleUpdateMember(item.userId, MemberRole.Member)
                        }
                        disabled={isUpdatingMember}
                      >
                        Set as Member
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium text-amber-700"
                        onClick={() => handleDeleteMember(item.userId)}
                        disabled={isDeletingMember}
                      >
                        Remove {item.name}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator className="my-1" />
              </Fragment>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};
