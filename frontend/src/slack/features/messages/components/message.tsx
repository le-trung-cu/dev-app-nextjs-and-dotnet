import { Hint } from "@/slack/components/hint";
import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";
import { MemberAvatar } from "../../members/components/member-avatar";
import { cn } from "@/lib/utils";
import { Thumbnail } from "@/slack/components/thumbnail";
import { Toolbar } from "./toolbar";
import { EditorValue } from "../../channels/components/editor";
import { useUpdateMessage } from "../api/use-update-message";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useDeleteMessage } from "../api/use-delete-mesage";
import { useConfirm } from "@/slack/hooks/use-confirm";
import { useToggleReaction } from "../api/use-toggle-reaction";
import { Reactions } from "./reactions";
import { usePanel } from "@/slack/hooks/use-panel";

const Editor = dynamic(() => import("../../channels/components/editor"));
const Renderer = dynamic(() => import("@/slack/components/renderer"), {
  ssr: false,
});

type MessageProps = {
  id: string;
  memberId: string;
  authorName?: string;
  authorImage?: string;
  isAuthor: boolean;
  reactions: {
    value: string;
    count: number;
    memberIds: string[];
  }[];
  body: string;
  imgUrl?: string;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: string) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
};

export const Message = ({
  id,
  isAuthor,
  memberId,
  authorImage,
  authorName = "Member",
  body,
  createdAt,
  updatedAt,
  isCompact,
  imgUrl,
  setEditingId,
  isEditing,
  reactions,
}: MessageProps) => {
  const workspaceId = useWorkspaceId();
  const { onOpenMessage } = usePanel();
  const [ConfirmDialog, confirm] = useConfirm();
  const { mutate: updateMessageApi, isPending: isUpdateingMessage } =
    useUpdateMessage();
  const handleUpdate = ({ body }: EditorValue) => {
    updateMessageApi(
      { workspaceId, messageId: id, body },
      {
        onSuccess: () => {
          setEditingId("");
        },
      },
    );
  };
  const { mutate: deleteMessageApi, isPending: isDeletingMessage } =
    useDeleteMessage();
  const handleDelete = async () => {
    if (isDeletingMessage) return;
    const ok = await confirm({
      title: "Delete message",
      description:
        "Are you sure you want to delete this message? This cannot be undone.",
    });
    if (!ok) return;

    deleteMessageApi({ workspaceId, messageId: id });
  };
  const { mutate: toggleReactionApi, isPending: isTogglingReaction } =
    useToggleReaction();
  const handleToggleReaction = (value: string) => {
    toggleReactionApi({ workspaceId, messageId: id, value });
  };

  if (isCompact) {
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            "group mx-14 flex gap-2 py-[1px]",
            isAuthor && "justify-self-end",
            isEditing && "justify-self-stretch",
          )}
        >
          {isEditing ? (
            <div className="h-full w-full">
              <Editor
                onSubmit={handleUpdate}
                onCancel={() => setEditingId("")}
                defaultValue={JSON.parse(body)}
                variant="update"
                disabled={isUpdateingMessage}
              />
            </div>
          ) : (
            <div className={cn(isAuthor && "flex flex-col items-end")}>
              <div className={cn("gorup flex", isAuthor && "flex-row-reverse")}>
                <div
                  className={cn(
                    "bg-muted/30 relative w-fit min-w-[100px] rounded-xl rounded-tl-none border p-3 pb-4",
                    isAuthor &&
                      "rounded-xl rounded-tr-none bg-blue-200 text-right",
                    isDeletingMessage &&
                      "origin-bottom scale-y-0 transform bg-red-500/50 transition-all duration-200",
                  )}
                >
                  <div>
                    <Renderer value={body} />
                    {imgUrl && (
                      <div className="p-2 px-12">
                        <Thumbnail imgUrl={imgUrl} />
                      </div>
                    )}
                  </div>

                  <Hint label={formatFullTime(new Date(createdAt))}>
                    <button className="text-muted-foreground/50 absolute right-2 bottom-0 text-xs">
                      {format(new Date(createdAt), "hh:mm")}
                    </button>
                  </Hint>
                </div>
                <div className="self-end px-2 pb-2 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                  <Toolbar
                    isAuthor={isAuthor}
                    hideThreadButton={false}
                    handleEdit={() => {
                      setEditingId(id);
                    }}
                    handleDelete={handleDelete}
                    handleReaction={handleToggleReaction}
                    handleThread={() => {
                      onOpenMessage(id);
                    }}
                  />
                </div>
              </div>
              <Reactions
                data={reactions}
                onChange={handleToggleReaction}
                className={cn(isAuthor && "justify-end")}
              />
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          "group mx-14 py-[1px]",
          isAuthor && "justify-self-end",
          isEditing && "justify-self-stretch",
        )}
      >
        <div
          className={cn(
            "relative text-sm font-semibold",
            isAuthor && "text-right",
          )}
        >
          {authorName}
          <div
            className={cn(
              "absolute top-2 left-0 -translate-x-[calc(100%+2px)]",
              isAuthor && "right-0 translate-x-[calc(100%+2px)]",
            )}
          >
            <MemberAvatar name={authorName} className="size-12" />
          </div>
        </div>
        {isEditing ? (
          <div className="h-full w-full">
            <Editor
              onSubmit={handleUpdate}
              onCancel={() => setEditingId("")}
              defaultValue={JSON.parse(body)}
              variant="update"
              disabled={isUpdateingMessage}
            />
          </div>
        ) : (
          <div className={cn(isAuthor && "flex flex-col items-end")}>
            <div className={cn("gorup flex", isAuthor && "flex-row-reverse")}>
              <div
                className={cn(
                  "bg-muted/30 relative w-fit min-w-[100px] rounded-xl rounded-tl-none border p-3 pb-4",
                  isAuthor &&
                    "rounded-xl rounded-tr-none bg-blue-200 text-right",
                  isDeletingMessage &&
                    "origin-bottom scale-y-0 transform bg-red-500/50 transition-all duration-200",
                )}
              >
                <div>
                  <Renderer value={body} />
                  {imgUrl && (
                    <div className="p-2 px-12">
                      <Thumbnail imgUrl={imgUrl} />
                    </div>
                  )}
                </div>
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-muted-foreground/50 absolute right-2 bottom-0 text-xs">
                    {format(new Date(createdAt), "hh:mm")}
                  </button>
                </Hint>
              </div>
              <div className="self-end px-2 pb-2 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                <Toolbar
                  isAuthor={isAuthor}
                  hideThreadButton={false}
                  handleEdit={() => {
                    setEditingId(id);
                  }}
                  handleDelete={handleDelete}
                  handleReaction={handleToggleReaction}
                  handleThread={() => {
                    onOpenMessage(id);
                  }}
                />
              </div>
            </div>
            <Reactions
              data={reactions}
              onChange={handleToggleReaction}
              className={cn(isAuthor && "justify-end")}
            />
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          "px-2 py-0.5",
          isAuthor && "justify-self-end",
          isEditing && "w-full",
        )}
      >
        <div className={cn("flex gap-2", isAuthor && "flex-row-reverse")}>
          <button>
            <MemberAvatar
              name={authorName}
              className="mt-1 size-10 rounded-md text-xs"
            />
          </button>
          <div>
            <span className="text-sm font-bold">{authorName}</span>
            <span>&nbsp;&nbsp;</span>
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="text-muted-foreground text-xs hover:underline">
                {format(new Date(createdAt), "hh:mm")}
              </button>
            </Hint>
          </div>
        </div>
        {isEditing ? (
          <div className="h-full w-full">
            <Editor
              onSubmit={handleUpdate}
              onCancel={() => setEditingId("")}
              defaultValue={JSON.parse(body)}
              variant="update"
              disabled={isUpdateingMessage}
            />
          </div>
        ) : (
          <div className={cn("flex", isAuthor && "flex-row-reverse")}>
            <div
              className={cn(
                "group bg-muted/30 relative mx-12 min-w-[100px] rounded-xl rounded-tl-none border px-4 pb-2",
                isAuthor &&
                  "mr-12 ml-auto rounded-xl rounded-tr-none bg-blue-200",
                isDeletingMessage &&
                  "origin-bottom scale-y-0 transform bg-red-500/50 transition-all duration-200",
              )}
            >
              <Renderer value={body} />
              <Toolbar
                isAuthor={isAuthor}
                handleEdit={() => setEditingId(id)}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        )}

        {imgUrl && (
          <div className="p-2 px-12">
            <Thumbnail imgUrl={imgUrl} />
          </div>
        )}
      </div>
    </>
  );
};

function formatFullTime(date: Date) {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
}
