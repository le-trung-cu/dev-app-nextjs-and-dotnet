import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useState } from "react";
import Quill from "quill";
import { useCreateMessage } from "../../messages/api/use-create-message";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useChannelId } from "../hooks/use-channel-id";
import { EditorValue } from "../../../components/editor";

const Editor = dynamic(() => import("../../../components/editor"), {
  ssr: false,
  loading: () => (
    <div className="space-y-2 border p-2">
      <div className="flex space-x-2">
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
      </div>
      <Skeleton className="h-[15px] w-full" />
      <Skeleton className="h-[15px] w-full" />
    </div>
  ),
});

type ChatInputProps = {
  placeholder: string;
};

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(1);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const editorRef = useRef<Quill | null>(null);
  const { mutate, isPending } = useCreateMessage();
  const onSumbit = ({ body, image }: EditorValue) => {
    editorRef.current?.disable();
    mutate(
      { workspaceId, channelId, body, image },
      {
        onSuccess: () => {
          setEditorKey((x) => x + 1);
        },
        onSettled: () => {
          editorRef.current?.enable();
        }
      },
    );
  };

  return (
    <div className="relative z-[9999] w-full px-5 bg-background">
      <Editor
        key={editorKey}
        onSubmit={onSumbit}
        innerRef={editorRef}
        placeholder={placeholder}
        disabled={isPending}
      />
    </div>
  );
};
