"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import Link from "next/link";
import { Project } from "../../projects/types";
import { GetWorkspaceAnalyticsResponseType } from "../types";
import { Member } from "../../members/types";
import { useCreateProjectDialog } from "../../projects/hooks/use-create-project-dialog";
import { useCreateTaskDialog } from "../../tasks/hooks/use-create-task-dialog";
import { WorkspaceAnalytics } from "./workspace-analytics";
import { Separator } from "@/components/ui/separator";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { MemberAvatar } from "../../members/components/member-avatar";

type WorkspaceHomeProps = {
  projects: Project[];
  tasks: GetWorkspaceAnalyticsResponseType["workspaceAnalytics"];
  members: Member[];
};
export const WorkspaceHome = ({
  projects,
  tasks,
  members,
}: WorkspaceHomeProps) => {
  const workspaceId = useWorkspaceId();
  const {open: openCreateProject} = useCreateProjectDialog();
  const {open: openCreateTask} = useCreateTaskDialog();

  return (
    <div>
      <WorkspaceAnalytics tasks={tasks} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="grid gap-5">
          <Card className="bg-gray-50/80">
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Assigned Tasks(14)</CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-[30px] text-gray-500"
                  onClick={openCreateTask}
                >
                  <Plus />
                </Button>
              </div>
              <CardDescription className="hidden" />
            </CardHeader>
            <Separator className="h-[1px] mx-1 mb-5" />
            <CardContent>
              <Button className="w-full">Show All</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Members (2)</CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-[30px] text-gray-500"
                >
                  <Settings />
                </Button>
              </div>
            </CardHeader>
            <Separator className="h-[1px] mb-5" />
            <CardContent>
              <div className="grid grid-cols-2 gap-3 row-auto">
                {members?.map((item) => (
                  <div
                    key={item.userId}
                    className="border flex items-center p-3 rounded-lg"
                  >
                    <MemberAvatar name={item.name} className="mr-3" />
                    <div>
                      <div>
                        <span>{item.name}</span>
                      </div>
                      <div className="text-muted-foreground text-xs">{item.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">
                  Project ({projects?.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-[30px] text-gray-500"
                  onClick={openCreateProject}
                >
                  <Plus />
                </Button>
              </div>
            </CardHeader>
            <Separator className="h-[1px] mb-5" />
            <CardContent>
              <div className="grid grid-cols-2 gap-3 row-auto">
                {projects?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/workspaces/${workspaceId}/projects/${item.id}`}
                    className="border flex items-center p-3 rounded-lg"
                  >
                    <ProjectAvatar
                      imgUrl={item.imgUrl}
                      name={item.name}
                      className="mr-3"
                    />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
