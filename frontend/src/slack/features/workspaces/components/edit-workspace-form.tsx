"use client";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { z } from "zod";
import { updateWorkspaceSchema, Workspace } from "../types";
import { useEditDialog } from "../hooks/use-edit-dialog";

type EditWorkspaceFormProps = {
  initiallValues: Workspace;
};
export const EditWorkspaceForm = ({
  initiallValues,
}: EditWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const [, onOpenChange] = useEditDialog();

  const form = useForm({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      name: initiallValues.name,
    },
  });
  const { mutate, isPending: isUpdating } = useUpdateWorkspace();

  const onFormSubmit = async (data: z.infer<typeof updateWorkspaceSchema>) => {
    if (isUpdating) return;
    
    mutate(
      { workspaceId, data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  const onCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit the workspace&apos;s name</DialogTitle>
        <DialogDescription></DialogDescription>
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
                    placeholder="Workspace Name e.g. 'Work', 'Personal', 'Home'"
                  />
                </FormControl>
                {error && (
                  <p className="text-destructive/80 text-sm">{error.message}</p>
                )}
              </FormItem>
            )}
          />
          <div className="mt-10 flex">
            <Button variant="outline" onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button className="ml-auto" disabled={isUpdating}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
