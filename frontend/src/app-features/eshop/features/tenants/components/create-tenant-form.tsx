import { useForm } from "react-hook-form";
import { createTenantSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useCreateTenant } from "../api/use-create-tenant";
import { useRouter } from "next/navigation";

export const CreateTenantForm = () => {
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      name: "",
      slug: "",
      stripeAcountId: "",
    },
  });

  const { mutate } = useCreateTenant();

  function createTenantHandler(data: any) {
    mutate(data, {
      onSuccess: (data) => {
        router.push(`/eshop/admin/collections/tenants/${data.slug}`);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(createTenantHandler)}
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
            <Save /> Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
