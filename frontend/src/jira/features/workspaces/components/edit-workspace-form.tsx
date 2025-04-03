"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { updateWorkspaceSchema, Workspace } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { fileToDataURL } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NEXT_PUBLIC_API_HOST_ADDRESS,
  NEXT_PUBLIC_SEFL_HOST_ADDRESS,
} from "@/constant";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useResetInviteToken } from "../api/use-reset-invite-token";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

type EditWorkspaceFormProps = {
  initialValues: Workspace;
  onCancel?: () => void;
};
export const EditWorkspaceForm = ({
  initialValues,
  onCancel,
}: EditWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      name: initialValues.name,
      imgUrl: initialValues.imgUrl,
      file: null,
    },
  });

  const { mutate: updateWorkspaceApi, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const onUpdateWorkspaceSubmit = (
    data: z.infer<typeof updateWorkspaceSchema>,
  ) => {
    updateWorkspaceApi({ workspaceId, data });
  };

  const onUpdateWorkspaceSubmitError = (data: unknown, error: unknown) => {
    debugger;
    console.error("onUpdateWorkspaceSubmitError", data, error);
  };

  const onRemoveWorkspacePhoto = () => {
    form.setValue("imgUrl", "");
    form.setValue("file", null);
  };

  const { mutate: resetInviteTokenApi } = useResetInviteToken();
  const onResetInviteTokenSubmit = () => {
    resetInviteTokenApi({ workspaceId });
  };
  const inviteToken = initialValues.inviteToken;
  console.log("xxxxxx", inviteToken);
  const onCopyInviteLink = async () => {
    if (!inviteToken) return;
    const token = `${NEXT_PUBLIC_SEFL_HOST_ADDRESS}/jira/workspaces/${workspaceId}/join-members?inviteToken=${initialValues.inviteToken}`;
    await window.navigator.clipboard.writeText(token).then(() => {
      toast.info("Copied invite link");
      // router.refresh();
    });
  };
  return (
    <div className="space-y-10">
      {/* Update workspace */}
      <Card>
        <CardHeader>
          <CardTitle>Edit the workspace</CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="mb-10 h-[10px]" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onUpdateWorkspaceSubmit,
                onUpdateWorkspaceSubmitError,
              )}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Workspace Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workspace name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <div className="mt-5 flex">
                    <ImagePreview
                      imgUrl={initialValues.imgUrl ? initialValues.imgUrl : ""}
                    />
                    <div>
                      <div>Workspace Icon</div>
                      <div className="text-muted-foreground text-sm">
                        JPG, PNG, SVG or JPEG, nax 1mb
                      </div>
                      <div className="mt-3 flex items-center gap-10">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-fit px-2 py-1"
                          onClick={onRemoveWorkspacePhoto}
                          type="button"
                        >
                          <Trash2 />
                          remove
                        </Button>

                        <Button
                          size="sm"
                          className="h-fit bg-gray-500 px-2 py-1 font-bold"
                          onClick={() => fileRef.current?.click()}
                          type="button"
                        >
                          Upload Image
                        </Button>
                      </div>

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
              <div className="my-5">
                <Separator />
              </div>
              <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                <div>
                  {onCancel && (
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isUpdatingWorkspace}
                      onClick={onCancel}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                <Button disabled={isUpdatingWorkspace}>Save changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Reset invite token */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Members</CardTitle>
          <CardDescription>
            Use the invite link to add members to your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5">
            <Input
              placeholder="reset workspace invite token"
              className="flex-grow"
              value={inviteToken ?? ""}
              readOnly
            />
            <Button variant="outline" size="icon" onClick={onCopyInviteLink}>
              <Copy />
            </Button>
          </div>
        </CardContent>
        <CardContent>
          <Separator />
        </CardContent>
        <CardFooter className="flex-row-reverse">
          <Button
            variant="destructive"
            className="font-bold"
            onClick={onResetInviteTokenSubmit}
          >
            Reset invite link
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Deleting a workspace is irreversible and will remove all associate
            data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="h-5" />
        </CardContent>
        <CardFooter className="flex-row-reverse">
          <Button variant="destructive" className="font-bold">
            Delete Workspace
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const ImagePreview = ({ imgUrl }: { imgUrl?: string }) => {
  const { control } = useFormContext();
  const { file, imgUrl: _imgUrl } = useWatch({
    control,
    defaultValue: {
      file: null,
      imgUrl,
    },
  });
  imgUrl = `${NEXT_PUBLIC_API_HOST_ADDRESS}${_imgUrl}`;
  const [dataUrl, setDataUrl] = useState(imgUrl);

  useEffect(() => {
    (async () => {
      if (!file) {
        setDataUrl("");
        return;
      }
      const dataURL = await fileToDataURL(file);
      setDataUrl(dataURL);
    })();
  }, [file]);

  if (!dataUrl) {
    if (imgUrl) {
      return (
        <div className="mr-5 flex size-[64px] items-center justify-center overflow-hidden rounded-lg bg-slate-200/30 shadow-md shadow-black">
          <Image
            src={imgUrl}
            height={64}
            width={64}
            alt=""
            className="size-[64px]"
          />
        </div>
      );
    }

    return (
      <div className="mr-5 flex size-[64px] items-center justify-center overflow-hidden rounded-full bg-slate-200/30">
        <ImageIcon className="size-[30px]" />
      </div>
    );
  }
  return (
    <div className="mr-5 flex size-[64px] items-center justify-center overflow-hidden rounded-lg bg-slate-200/30 shadow-md shadow-black">
      <Image
        src={dataUrl}
        height={64}
        width={64}
        alt=""
        className="size-[64px]"
      />
    </div>
  );
};
