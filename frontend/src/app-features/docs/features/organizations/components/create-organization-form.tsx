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
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useCreateOrganization } from "../api/use-create-organization";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { ImagePreview } from "@/app-features/docs/components/image-preview";
import { createOrganizationSchema } from "../types";
import { Label } from "@/components/ui/label";

type CreateOrganizationFormProps = {
  onCancel?: () => void;
  onCreated?: (organizationlId: string) => void;
};

export const CreateOrganizationForm = ({
  onCancel,
  onCreated,
}: CreateOrganizationFormProps) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      slug: "",
      file: null,
    },
  });

  const name = useWatch({ control: form.control, name: "name" });
  useEffect(() => {
    // Auto-generate slug from name
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const slug = generatedSlug || "my-org";
      form.setValue("slug", slug);
      return;
    }
  }, [name]);

  const { mutate } = useCreateOrganization();

  const onFormSubmit = (data: z.infer<typeof createOrganizationSchema>) => {
    mutate(data, {
      onSuccess: (data) => {
        onCreated?.(data.organizationId);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create organization</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <Label>Logo</Label>
                  <div className="flex">
                    <ImagePreview />
                    <div>
                      <Button
                        size="sm"
                        className="text-muted-foreground mt-2 h-fit px-2 py-1 font-normal"
                        onClick={() => fileRef.current?.click()}
                        type="button"
                        variant="outline"
                      >
                        Upload
                      </Button>
                      <div className="text-muted-foreground mt-1 text-xs">
                        Recommended size 1:1, upto 10MB.
                      </div>
                      <input
                        ref={fileRef}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        type="file"
                        hidden
                      />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
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
              name="slug"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Slug" />
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
              <Button className="ml-auto">Create</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
