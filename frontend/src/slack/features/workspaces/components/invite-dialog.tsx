import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, RefreshCcw } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { toast } from "sonner";
import { NEXT_PUBLIC_SEFL_HOST_ADDRESS } from "@/constant";
import { useResetInviteToken } from "../api/use-reset-invite-token";
import { useConfirm } from "@/slack/hooks/use-confirm";

type InviteDialogType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  inviteCode: string;
};

export const InviteDialog = ({
  open,
  onOpenChange,
  name,
  inviteCode,
}: InviteDialogType) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useResetInviteToken();
  const [ConfirmDialog, confirm] = useConfirm();

  const onResetInviteTokenHandler = async () => {
    if (isPending) return;
    const ok = await confirm({
      title: "Are you sure?",
      description:
        "This will deactivate the current invite code and generate a new one.",
    });

    if (!ok) return;

    mutate({ workspaceId });
  };
  const onCopyCode = () => {
    const text = `${NEXT_PUBLIC_SEFL_HOST_ADDRESS}/slack/join/${workspaceId}`;

    window.navigator.clipboard
      .writeText(text)
      .then(() => toast.info("copy success"));
  };

  const onCloseHandler = () => {
    onOpenChange(false);
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="my-5 flex flex-col items-center justify-center space-y-5">
            <div className="text-5xl font-bold">{inviteCode}</div>
            <Button variant="ghost" onClick={onCopyCode}>
              Copy link <Copy />
            </Button>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onResetInviteTokenHandler}
              disabled={isPending}
            >
              New code <RefreshCcw />
            </Button>
            <Button onClick={onCloseHandler}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
