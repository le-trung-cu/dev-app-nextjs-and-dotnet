"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProjectSchema } from "../types";
import { z } from "zod";
import { useCreateProject } from "../api/use-create-project";
import { Input } from "@/components/ui/input";
import { ImagePreview } from "./image-preview";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useCreateProjectDialog } from "../hooks/use-create-project-dialog";
// type CreateProjectFormProps = {
// };

export const CreateProjectForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const workspaceId = useWorkspaceId();
  const { close } = useCreateProjectDialog();
  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      imgUrl: "",
      file: null,
    },
  });
  const { mutate } = useCreateProject();

  const onFormSubmit = (data: z.infer<typeof createProjectSchema>) => {
    mutate({ workspaceId, data });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new project</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Workspace Name" />
                  </FormControl>
                  {error && (
                    <p className="text-destructive/80 text-sm">
                      {error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <div className="mt-5 flex">
                  <ImagePreview />
                  <div>
                    <div>Project Icon</div>
                    <div className="text-muted-foreground text-sm">
                      JPG, PNG, SVG or JPEG, nax 1mb
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 h-fit bg-gray-500 px-2 py-1 font-bold"
                      onClick={() => fileRef.current?.click()}
                      type="button"
                    >
                      Upload Image
                    </Button>
                    <input
                      ref={fileRef}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      type="file"
                      hidden
                    />
                  </div>
                </div>
              )}
            />
            <div className="mt-10 flex">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button className="ml-auto">Create</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
