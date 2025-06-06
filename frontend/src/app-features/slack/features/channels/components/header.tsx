"use client";

import { FaChevronDown } from "react-icons/fa";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useGetChannel } from "../api/use-get-channel";
import { useChannelId } from "../hooks/use-channel-id";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { useGetCurrentMember } from "../../members/api/use-get-current-member";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateChannel } from "../api/use-update-channel";
import { useDeleteChannel } from "../api/use-delete-channel";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/app-features/slack/hooks/use-confirm";

interface HeaderProps {
  name: string;
}
export const Header = ({ name }: HeaderProps) => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { data: member } = useGetCurrentMember({ workspaceId });
  const [value, setValue] = useState(name);
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm();
  const { mutate: updateChannel, isPending: isUpdatingChannel } =
    useUpdateChannel();
  const { mutate: removeChannel, isPending: isRemovingChannel } =
    useDeleteChannel();

  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "Admin") return;

    setEditOpen(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete this channel?",
      description:
        "You are about to delete this channel. This action is irreversible",
    });

    if (!ok) return;

    removeChannel(
      { workspaceId, channelId },
      {
        onSuccess: () => {
          toast.success("Channel deleted");
          router.push(`/slack/workspaces/${workspaceId}`);
        },
        onError: () => {
          toast.error("Failed to delete channel");
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateChannel(
      { channelId, workspaceId, data: { name: value } },
      {
        onSuccess: () => {
          toast.success("Channel updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update channel");
        },
      },
    );
  };
  return (
    <div className="bg-background  sticky top-0 z-50 shrink-0 border-b  h-[49px] items-center flex justify-between px-4">
      <ConfirmDialog/>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-auto overflow-hidden px-2 text-lg font-semibold"
            size="sm"
          >
            <span className="truncate"># {name}</span>
            <FaChevronDown className="ml-2 size-2.5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="border-b bg-white p-4">
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel name</p>
                    {member?.role === "Admin" && (
                      <p className="text-sm font-semibold text-[#1264a3] hover:underline">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="text-sm"># {name}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={value}
                    disabled={isUpdatingChannel}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="e.g. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingChannel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingChannel}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role === "Admin" && (
              <button
                onClick={handleDelete}
                disabled={isRemovingChannel}
                className="flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50"
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
