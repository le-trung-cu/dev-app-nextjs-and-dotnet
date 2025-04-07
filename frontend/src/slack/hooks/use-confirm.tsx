import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useConfirm = () => {
  const [promise, setPromise] = useState<{
    resolve: (ok: boolean) => void;
  }>();

  const [state, setSate] = useState({
    title: "",
    description: "",
  });

  const confirm = async (content?: {
    title?: string;
    description?: string;
  }) => {
    setSate({
      title: content?.title ?? "",
      description: content?.description ?? "",
    });
    return new Promise((resolve) => {
      setPromise({
        resolve: (confirm: boolean) => resolve(confirm),
      });
    });
  };

  const onConfirm = () => {
    promise?.resolve(true);
    setPromise(undefined);
  };

  const onCancel = () => {
    promise?.resolve(false);
    setPromise(undefined);
  };

  const ConfimDialog = () => (
    <Dialog open={!!promise} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{state.title}</DialogTitle>
          <DialogDescription>{state.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfimDialog, confirm] as const;
};
