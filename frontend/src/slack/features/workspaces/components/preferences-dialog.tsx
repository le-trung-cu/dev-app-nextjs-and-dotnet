import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useGetWorkspace } from "../api/use-get-workspace";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { usePreferencesDialog } from "../hooks/use-preferences-dialog";
import { useEditDialog } from "../hooks/use-edit-dialog";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useConfirm } from "@/slack/hooks/use-confirm";
import { useRouter } from "next/navigation";

export const PreferencesDialog = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspace({ workspaceId });
  const [openPreference, setOpenPreference] = usePreferencesDialog();
  const [, setOpenEdit] = useEditDialog();
  const [ConfimDialog, confirm] = useConfirm();
  const { mutate: deleteWorkspaceApi, isPending: isDeleting } =
    useDeleteWorkspace();

  if (isPending) {
    return null;
  }
  if (!data) {
    return null;
  }

  const onDelete = async () => {
    if (isDeleting) return;
    const ok = await confirm({
      title: "Are your sure?",
      description: "This action is irreversible",
    });
    if (!ok) return;

    deleteWorkspaceApi(
      { workspaceId },
      {
        onSuccess: () => {
          router.replace("/slack");
        },
      },
    );
  };

  return (
    <>
      <ConfimDialog />
      <Dialog open={openPreference} onOpenChange={setOpenPreference}>
        <DialogContent className="p-0">
          <DialogHeader className="pt-5 pl-5">
            <DialogTitle>{data.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 bg-gray-200/30 p-5">
            <div className="flex justify-between rounded-sm bg-white p-5">
              <div>
                <div className="text-lg font-semibold">Workspace name</div>
                <div className="text-sm">{data.name}</div>
              </div>
              <Button
                variant="ghost"
                className="font-semibold text-blue-500"
                onClick={() => setOpenEdit(true)}
              >
                Edit
              </Button>
            </div>
            <div className="flex justify-between rounded-sm bg-white p-5">
              <Button
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={onDelete}
              >
                <Trash /> Delete workspace
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
