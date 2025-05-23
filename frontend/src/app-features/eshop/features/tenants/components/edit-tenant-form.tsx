import { useForm } from "react-hook-form";
import { Tenant, updateTenantSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useUpdateTenant } from "../api/use-update-tenant";
import { useRouter } from "next/navigation";
import { InputMedia } from "../../media/components/input-media";
import { useState } from "react";
import { Media } from "../../media/types";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

type Props = {
  initialValues: Tenant;
};
export const EditTenantForm = ({ initialValues }: Props) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<null | undefined | Media>(
    initialValues.image,
  );

  const form = useForm({
    resolver: zodResolver(updateTenantSchema),
    defaultValues: {
      name: initialValues.name,
      slug: initialValues.slug,
      imageId: initialValues.image?.id ?? "",
      stripeAcountId: initialValues.stripeAcountId ?? "",
    },
  });

  const { mutate } = useUpdateTenant();

  function updateTenantHandler(data: any) {
    mutate(
      { ...data, id: initialValues.id, imageId: selectedImage?.id ?? null },
      {
        onSuccess: (data, { slug, id }) => {
          router.replace(
            `/eshop/admin/collections/tenants/${initialValues.id}`,
          );
        },
      },
    );
  }

  return (
    <div>
      <div className="flex justify-between p-10 pb-0">
        <h1 className="text-4xl font-bold">{initialValues.name}</h1>{" "}
      </div>
      <Separator className="my-2" />
      <div className="flex items-center space-x-10 px-10 text-sm">
        <div>
          <span className="text-gray-500">Last Modified: </span>
          <span className="font-bold">
            {format(initialValues.lastModified, "MMMM do yy, h:mm a")}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Created: </span>
          <span className="font-bold">
            {format(initialValues.createdAt, "MMMM do yy, h:mm a")}
          </span>
        </div>
        <Button
          className="ml-auto"
          onClick={form.handleSubmit(updateTenantHandler)}
        >
          Save
        </Button>
      </div>
      <Separator className="mt-2 mb-10" />
      <Form {...form}>
        <form
          className="space-y-5 px-10"
          onSubmit={form.handleSubmit(updateTenantHandler)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <Input {...field} placeholder="Store Name" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <Input {...field} placeholder="Slug" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className="rounded-sm border p-2">
                  <InputMedia
                    tenantId={initialValues.id}
                    media={selectedImage}
                    onMediaChange={(media) => setSelectedImage(media)}
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stripeAcountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stripe Acount Id</FormLabel>
                <Input {...field} placeholder="Stripe Acount Id" />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button>
              <Save /> Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
