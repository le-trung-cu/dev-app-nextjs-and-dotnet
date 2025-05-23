import { useForm } from "react-hook-form";
import { Product, updateProductScheme } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { InputMedia } from "../../media/components/input-media";
import { useState } from "react";
import { Media } from "../../media/types";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useUpdateProduct } from "../api/use-update-product";
import { Category } from "../../categories/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

type Props = {
  categories: Category[];
  initialValues: Product;
};
export const EditProductForm = ({ categories, initialValues }: Props) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<null | undefined | Media>(
    initialValues.image,
  );
  const [selectedCover, setSelectedCover] = useState<null | undefined | Media>(
    initialValues.cover,
  );

  const form = useForm({
    resolver: zodResolver(updateProductScheme),
    defaultValues: {
      name: initialValues.name,
      categories: initialValues.categories?.[0]?.id as string,
      description: initialValues.description,
      price: initialValues.price,
      imageId: initialValues.image?.id,
      coverId: initialValues.cover?.id,
    },
  });

  const { mutate } = useUpdateProduct();

  function updateTenantHandler(data: z.infer<typeof updateProductScheme>) {
    const categories = [data.categories];
    mutate(
      {
        ...data,
        id: initialValues.id,
        categories,
        imageId: selectedImage?.id ?? null,
        coverId: selectedCover?.id ?? null,
      },
      {
        onSuccess: (data, { id }) => {
          router.replace(
            `/eshop/admin/collections/products/${initialValues.id}`,
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
          onSubmit={form.handleSubmit(updateTenantHandler, (e, error) =>
            console.log(e, error),
          )}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <Input {...field} placeholder="Product Name" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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
                    tenantId={initialValues.tenantId}
                    media={selectedImage}
                    onMediaChange={(media) => setSelectedImage(media)}
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <div className="rounded-sm border p-2">
                  <InputMedia
                    tenantId={initialValues.tenantId}
                    media={selectedCover}
                    onMediaChange={(media) => setSelectedCover(media)}
                  />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit">
              <Save /> Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
