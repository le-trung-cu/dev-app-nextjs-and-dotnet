"use client";
import { useGetOrganizations } from "../api/use-get-organizations";
import * as React from "react";
import { ChevronsUpDown, Plus, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OrganizationAvatar } from "./organization-avatar";
import { ReponsiveDialog } from "@/app-features/docs/components/reponsive-dialog";
import { CreateOrganizationForm } from "./create-organization-form";
import { useCurrentInfo } from "@/app-features/auth/api/use-current-info";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSwichesOrganization } from "../api/use-swiches-organization";
import { UserAvatar } from "@/app-features/auth/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { InviteMembersForm } from "./invite-members-form";
import { useInviteMemberApprove } from "../api/use-invite-member-approve";

export function OrganizationSwicher() {
  const { data: current, isLoading: isLoadingCurrent } = useCurrentInfo();
  const { data: organizations, isLoading: isLoadingOrganizations } =
    useGetOrganizations();
  const [openCreateOrganization, setOpenCreateOrganization] =
    React.useState(false);
  const [openInviteMembers, setOpenInviteMembers] = React.useState(false);

  const router = useRouter();

  const organizationId = current?.appClaims.app_docs_organization ?? null;
  const selected = organizations?.find((x) => x.id === organizationId) ?? null;

  const { mutate } = useSwichesOrganization();
  function handleSwichesOrganization(organizationId: string | null) {
    mutate({ organizationId }, {});
  }

  const { mutate: approveApi, isPending: isPendingApprove } =
    useInviteMemberApprove();
  function handleInviteMemberApprove(organizationId: string) {
    if (isPendingApprove) return;
    approveApi(
      { organizationId },
      {
        onSuccess: () => {
          handleSwichesOrganization(organizationId);
        },
      },
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            {/* <WorkspaceAvatar
              imgUrl={`${NEXT_PUBLIC_API_HOST_ADDRESS}${activeWorkspace.imgUrl}`}
              name={activeWorkspace.name}
            /> */}
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="flex items-center truncate font-medium">
                {!selected && (
                  <>
                    <UserAvatar
                      className="mr-2 border"
                      isLoading={isLoadingCurrent}
                      name={current?.user.name!}
                    />
                    Personal Account
                  </>
                )}
                {!!selected && (
                  <>
                    <OrganizationAvatar
                      className="mr-2 border"
                      imgUrl={selected.imgUrl}
                      name={selected.name}
                    />
                    {selected.name}
                  </>
                )}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-[300px] rounded-lg"
          align="end"
          sideOffset={4}
        >
          {!!selected && (
            <>
              <DropdownMenuItem className="gap-2 p-2" asChild>
                <div className="flex items-center">
                  <OrganizationAvatar
                    imgUrl={selected.imgUrl}
                    name={selected.name}
                  />
                  <div>
                    <div className="text-sm font-bold">{selected.name}</div>
                    <div className="text-muted-foreground">{selected.members[0].role}</div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Settings /> Manager
                  </Button>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem className="gap-2 p-2" asChild>
            <div onClick={() => handleSwichesOrganization(null)}>
              <UserAvatar
                isLoading={isLoadingCurrent}
                name={current?.user.name!}
              />
              Personal Account
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </div>
          </DropdownMenuItem>
          {!selected && organizations && organizations.length > 0 && (
            <DropdownMenuSeparator />
          )}
          {organizations?.map((item, index) => {
            if (item === selected) {
              return <React.Fragment key={organizationId}></React.Fragment>;
            }
            return (
              <DropdownMenuItem key={item.id} className="gap-2 p-2" asChild>
                <div
                  onClick={() => {
                    if (!item.members[0].isJoined) return;
                    handleSwichesOrganization(item.id);
                  }}
                >
                  <OrganizationAvatar imgUrl={item.imgUrl} name={item.name} />
                  {item.name}
                  {!item.members[0].isJoined && (
                    <Button
                      className="ml-auto"
                      variant="outline"
                      onClick={() => handleInviteMemberApprove(item.id)}
                    >
                      Join
                    </Button>
                  )}
                </div>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 p-2"
            onClick={() => setOpenCreateOrganization(true)}
          >
            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <Plus className="size-4" />
            </div>
            <div className="text-muted-foreground font-medium">
              Create Organization
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ReponsiveDialog
        open={openCreateOrganization}
        onOpenChange={setOpenCreateOrganization}
      >
        <CreateOrganizationForm
          onCancel={() => setOpenCreateOrganization(false)}
          onCreated={(id) => {
            setOpenCreateOrganization(false);
            setOpenInviteMembers(true);
          }}
        />
      </ReponsiveDialog>
      {organizationId && (
        <ReponsiveDialog
          open={openInviteMembers}
          onOpenChange={setOpenInviteMembers}
        >
          <InviteMembersForm
            organizationId={organizationId}
            onSendInvitaions={() => setOpenInviteMembers(false)}
          />
        </ReponsiveDialog>
      )}
    </>
  );
}
