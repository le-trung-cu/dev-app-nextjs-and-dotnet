"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateChannel } from "../api/use-create-channel";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateChannelDialog } from "../hooks/use-create-channel-dialog";
import { createChannelSchema } from "../types";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
};

export const CreateChanelDialog = ({ }: CreateWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelDialog();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutate, isPending } = useCreateChannel();

  const onFormSubmit = (data: z.infer<typeof createChannelSchema>) => {
    if (isPending) return;

    mutate(
      { workspaceId, data },
      {
        onSuccess: () => {
          handleClose();
          setOpen(false);
          router.push(`/slack/workspaces/${workspaceId}`);
        },
      },
    );
  };

  const handleClose = () => {
    setOpen(false);
    form.reset();
    form.clearErrors();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Channel Name e.g. 'plan-budget'"
                    />
                  </FormControl>
                  {error && (
                    <p className="text-destructive/80 text-sm">
                      {error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="mt-10 flex">
              <Button variant="outline" onClick={handleClose} type="button">
                Cancel
              </Button>
              <Button className="ml-auto" disabled={isPending}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
