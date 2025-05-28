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
import { createOrganizationSchema, initeMembersSchema } from "../types";
import { Label } from "@/components/ui/label";
import { useInviteMembers } from "../api/use-invite-members";
import AsyncSelect from "react-select/async";
import { User } from "@/app-features/auth/types";
import { clients } from "@/lib/clients";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InviteMembersFormProps = {
  organizationId: string;
  onSendInvitaions?: () => void;
};

export const InviteMembersForm = ({
  organizationId,
  onSendInvitaions,
}: InviteMembersFormProps) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(initeMembersSchema),
    defaultValues: {
      userIds: [],
      role: "",
    },
  });

  const { mutate } = useInviteMembers();

  const onFormSubmit = (data: z.infer<typeof initeMembersSchema>) => {
    mutate(
      { ...data, organizationId },
      {
        onSuccess: (data) => {
          onSendInvitaions?.();
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite new members</CardTitle>
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
              name="userIds"
              render={({ field }) => (
                <FormItem>
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions
                    getOptionLabel={(user) => user.email}
                    getOptionValue={(user) => user.id}
                    loadOptions={promiseOptions}
                    onChange={(newValue) => {
                      field.onChange(newValue.map(x => x.id));
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: 150,
                        alignItems: "start",
                      }),
                      dropdownIndicator: (baseStyles, state) => ({
                        display: "none",
                      }),
                      clearIndicator: (baseStyles, state) => ({
                        display: "none",
                      }),
                    }}
                  />
                </FormItem>
              )}
            />

            <div className="mt-10 flex">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel>Role: </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className="ml-auto">Send invitations</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

async function promiseOptions(search: string) {
  const response = await clients.get<{ isSuccess: boolean; users: User[] }>(
    `/auth/users?search=${search}`,
  );
  return response.data.users;
}
