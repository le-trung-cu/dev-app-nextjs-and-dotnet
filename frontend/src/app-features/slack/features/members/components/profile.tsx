import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ChevronDownIcon,
  Loader,
  MailIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/app-features/slack/hooks/use-confirm";
import { useGetMemberById } from "../api/use-get-member-by-id";
import { useGetCurrentMember } from "../api/use-get-current-member";
import { useUpdateMember } from "../api/use-update-member";
import { useDeleteMember } from "../api/use-delete-member";
import { MemberRole } from "../types";

interface ProfileProps {
  userId: string;
  onClose: () => void;
}

export const Profile = ({ userId, onClose }: ProfileProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [UpdateDialog, confirmUpdate] = useConfirm();
  const [LeaveDialog, confirmLeave] = useConfirm();
  const [RemoveDialog, confirmRemove] = useConfirm();

  const { data: member, isLoading: isLoadingMember } = useGetMemberById({
    workspaceId,
    userId,
  });
  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useGetCurrentMember({
      workspaceId,
    });

  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const { mutate: removeMember, isPending: isRemovingMember } =
    useDeleteMember();

  const onRemove = async () => {
    const ok = await confirmRemove({
      title: "Remove member",
      description: "Are you sure you want to remove this member?",
    });

    if (!ok) return;

    removeMember(
      {workspaceId, userId },
      {
        onSuccess: () => {
          toast.success("Member removed");
          onClose();
        },
        onError: () => {
          toast.error("Failed to remove member");
        },
      },
    );
  };

  const onLeave = async () => {
    const ok = await confirmLeave();

    if (!ok) return;

    removeMember(
      { workspaceId, userId },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => {
          toast.error("Failed to leave the workspace");
        },
      },
    );
  };

  const onUpdate = async (role: "Admin" | "Member") => {
    const ok = await confirmUpdate({
      title: "Change role",
      description: "Are you sure you want to change this member's role?",
    });

    if (!ok) return;

    updateMember(
      { workspaceId, userId, role: role as MemberRole },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          toast.error("Failed to change role");
        },
      },
    );
  };

  if (isLoadingMember || isLoadingCurrentMember) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="icon" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <Loader className="text-muted-foreground size-5 animate-spin" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="icon" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="text-muted-foreground size-5" />
          <p className="text-muted-foreground text-sm">Profile not found</p>
        </div>
      </div>
    );
  }

  const avatarFallback = member.name?.[0] ?? "M";

  return (
    <>
      <RemoveDialog />
      <LeaveDialog />
      <UpdateDialog />
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="icon" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="size-full max-h-[256px] max-w-[256px]">
            <AvatarFallback className="aspect-square text-6xl">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col p-4">
          <p className="tex-xl font-bold">{member.name}</p>
          {currentMember?.role === "Admin" &&
          currentMember?.userId !== userId ? (
            <div className="mt-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full capitalize">
                    {member.role} <ChevronDownIcon className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdate(role as "Admin" | "Member")
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={onRemove} variant="outline" className="w-full">
                Remove
              </Button>
            </div>
          ) : currentMember?.userId === userId &&
            currentMember?.role !== "Admin" ? (
            <div className="mt-4">
              <Button onClick={onLeave} variant="outline" className="w-full">
                Leave
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="flex flex-col p-4">
          <p className="mb-4 text-sm font-bold">Contact information</p>
          <div className="flex items-center gap-2">
            <div className="bg-muted flex size-9 items-center justify-center rounded-md">
              <MailIcon className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-[13px] font-semibold">
                Email Address
              </p>
              <Link
                href={`mailto:${member.email}`}
                className="text-sm text-[#1264a3] hover:underline"
              >
                {member.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
