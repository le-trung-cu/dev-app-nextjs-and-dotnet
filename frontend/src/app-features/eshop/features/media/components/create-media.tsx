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
import { createMediaSchema } from "../types";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useCreateMedia } from "../api/use-create-media";
import { ImagePreview } from "@/app-features/eshop/components/image-preview";
import { useTenantId } from "../../tenants/hooks/use-tenant-id";
import { Separator } from "@/components/ui/separator";

interface Props {
  tenantId: string;
  onCreated: (media: {
    name: string;
    path: string;
    id: string;
    alt: string;
  }) => void;
}

export const CreateMedia = ({tenantId, onCreated}: Props) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(createMediaSchema),
    defaultValues: {
      alt: "",
      file: null as any,
    },
  });
  const { mutate } = useCreateMedia();

  const onFormSubmit = (data: z.infer<typeof createMediaSchema>) => {
    console.log(data);
    mutate({ ...data, tenantId }, {
      onSuccess: (data) => {
        onCreated(data);
      },
    });
  };

  return (
    <Card className="h-[90vh]">
      <CardHeader>
        <div className="flex items-center justify-between pt-8">
          <CardTitle>Create new Media</CardTitle>
          <Button onClick={form.handleSubmit(onFormSubmit)}>Save</Button>
        </div>
      </CardHeader>
      <Separator/>
      <CardContent>
        <Form {...form}>
          <form>
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
            <FormField
              control={form.control}
              name="alt"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="mt-10">
                  <FormLabel>Alt</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Image Description" />
                  </FormControl>
                  {error && (
                    <p className="text-destructive/80 text-sm">
                      {error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
