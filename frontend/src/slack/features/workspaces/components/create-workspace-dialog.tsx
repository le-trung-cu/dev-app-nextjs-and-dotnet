"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../types";
import { z } from "zod";
import { useCreateWorkspace } from "../api/use-create-workspace";
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
import { useCreateWorkspaceDialog } from "../hooks/use-create-workspace-dialog";

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
};

export const CreateWorkspaceDialog = ({ onCancel }: CreateWorkspaceFormProps) => {
  const [open, setOpen] = useCreateWorkspaceDialog();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutate, isPending } = useCreateWorkspace();

  const onFormSubmit = (data: z.infer<typeof createWorkspaceSchema>) => {
    if(isPending) return;

    mutate(data, {
      onSuccess: (data) => {
        router.push(`/slack/workspaces/${data.id}`);
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
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
                    <Input {...field} placeholder="Workspace Name e.g. 'Work', 'Personal', 'Home'" />
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
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button className="ml-auto" disabled={isPending}>Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
