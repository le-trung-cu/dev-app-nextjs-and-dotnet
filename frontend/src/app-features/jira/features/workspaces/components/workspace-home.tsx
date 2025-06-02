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
import { useCreateProjectDialog } from "../../projects/hooks/use-create-project-dialog";
import { useCreateTaskDialog } from "../../tasks/hooks/use-create-task-dialog";
import { Separator } from "@/components/ui/separator";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { MemberAvatar } from "../../members/components/member-avatar";
import { useGetMembers } from "../../members/api/use-get-members";
import { useGetProjects } from "../../projects/api/use-get-projects";
import { Suspense } from "react";
import {
  WorkspaceAnalytics,
  WorkspaceAnalyticsSkeleton,
} from "../../../components/analytics";
import { WorkspaceHeader } from "./workspace-header";

type WorkspaceHomeProps = {
  workspaceId: string;
};
export const WorkspaceHome = ({ workspaceId }: WorkspaceHomeProps) => {
  const { data: projects, isPending: isPendingProjects } = useGetProjects({
    workspaceId,
  });

  const { open: openCreateProject } = useCreateProjectDialog();
  const { open: openCreateTask } = useCreateTaskDialog();

  return (
    <>
      <WorkspaceHeader />
      <div className="px-1 md:px-5">
        <div>
          <Suspense fallback={<WorkspaceAnalyticsSkeleton />}>
            <WorkspaceAnalytics workspaceId={workspaceId} />
          </Suspense>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="grid gap-5">
              <Card className="bg-gray-50/80">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Assigned Tasks(14)
                    </CardTitle>
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
                <Separator className="mx-1 mb-5 h-[1px]" />
                <CardContent>
                  <Button className="w-full">Show All</Button>
                </CardContent>
              </Card>
              <CardMembers workspaceId={workspaceId} />
            </div>
            <div className="">
              <Card>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
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
                <Separator className="mb-5 h-[1px]" />
                <CardContent>
                  <div className="row-auto grid grid-cols-2 gap-3">
                    {projects?.map((item) => (
                      <Link
                        key={item.id}
                        href={`/workspaces/${workspaceId}/projects/${item.id}`}
                        className="flex items-center rounded-lg border p-3"
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
      </div>
    </>
  );
};

const CardMembers = ({ workspaceId }: { workspaceId: string }) => {
  const { data: members, isPending: isGetringMembers } = useGetMembers({
    workspaceId,
  });
  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            Members ({members?.length})
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            className="size-[30px] text-gray-500"
          >
            <Settings />
          </Button>
        </div>
      </CardHeader>
      <Separator className="mb-5 h-[1px]" />
      <CardContent>
        <div className="row-auto grid grid-cols-2 gap-3">
          {members?.map((item) => (
            <div
              key={item.userId}
              className="flex items-center rounded-lg border p-3"
            >
              <MemberAvatar name={item.name} className="mr-3" />
              <div>
                <div>
                  <span>{item.name}</span>
                </div>
                <div className="text-muted-foreground text-xs">
                  {item.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
