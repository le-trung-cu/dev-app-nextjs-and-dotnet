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

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data: members } = useGetMembers({ workspaceId });
  return (
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
        <Separator className="h-2 mb-10" />
        {members?.map((item) => {
          return (
            <Fragment key={item.userId}>
              <div className="flex items-center py-5">
                <MemberAvatar name={item.name} className="mr-3" />
                <div>
                  <div className="font-bold">{item.name} <Badge variant="secondary" className="ml-3">{item.role}</Badge></div>
                  <div className="text-muted-foreground text-sm">{item.email}</div>
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
                    <DropdownMenuItem className="bg-orange-400/40 text-red-500 font-semibold">
                      <Trash2 /> Delete this member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator className="my-1"/>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};
