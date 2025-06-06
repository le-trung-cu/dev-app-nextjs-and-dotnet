import Quill from "quill";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useCreateMessage } from "../../messages/api/use-create-message";
import { EditorValue } from "@/app-features/slack/components/editor";

const Editor = dynamic(() => import("@/app-features/slack/components/editor"), {
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

interface ChatInputProps {
  placeholder: string;
  conversationId: string;
}

export const ChatInput = ({ conversationId, placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(1);

  const workspaceId = useWorkspaceId();

  const editorRef = useRef<Quill | null>(null);
  const { mutate, isPending } = useCreateMessage();
  const onSumbit = ({ body, image }: EditorValue) => {
    editorRef.current?.disable();
    mutate(
      { workspaceId, conversationId, body, image },
      {
        onSuccess: () => {
          setEditorKey((x) => x + 1);
        },
        onSettled: () => {
          editorRef.current?.enable();
        },
      },
    );
  };

  return (
    <div className="bg-background relative z-[9999] w-full px-5">
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
