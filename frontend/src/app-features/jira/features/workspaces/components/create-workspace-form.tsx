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
import { createWorkspaceSchema } from "../types";
import { z } from "zod";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ImagePreview } from "./image-preview";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
type CreateWorkspaceFormProps = {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({onCancel}: CreateWorkspaceFormProps) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      imgUrl: "",
      file: null,
    },
  });
  const { mutate } = useCreateWorkspace();

  const onFormSubmit = (data: z.infer<typeof createWorkspaceSchema>) => {
    mutate(data, {
      onSuccess: (data) => {
        router.push(`/jira/workspaces/${data.id}`);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new workspace</CardTitle>
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
                  <FormLabel>Workspace Name</FormLabel>
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
                    <div>Workspace Icon</div>
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
              {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
              <Button className="ml-auto">Create</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
