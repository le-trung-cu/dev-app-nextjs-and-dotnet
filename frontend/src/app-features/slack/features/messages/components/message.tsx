import { Hint } from "@/app-features/slack/components/hint";
import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";
import { MemberAvatar } from "../../members/components/member-avatar";
import { cn } from "@/lib/utils";
import { Thumbnail } from "@/app-features/slack/components/thumbnail";
import { Toolbar } from "./toolbar";
import { EditorValue } from "../../../components/editor";
import { useUpdateMessage } from "../api/use-update-message";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useDeleteMessage } from "../api/use-delete-mesage";
import { useConfirm } from "@/app-features/slack/hooks/use-confirm";
import { useToggleReaction } from "../api/use-toggle-reaction";
import { Reactions } from "./reactions";
import { usePanel } from "@/app-features/slack/hooks/use-panel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRef, useState } from "react";
import { ThreadBar } from "./thread-bar";

const Editor = dynamic(() => import("../../../components/editor"));
const Renderer = dynamic(
  () => import("@/app-features/slack/components/renderer"),
  {
    ssr: false,
  },
);

type MessageProps = {
  id: string;
  userId?: string;
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
  threadTimestamp?: string;
};

export const Message = ({
  id,
  isAuthor,
  userId,
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
  threadCount,
  threadTimestamp,
}: MessageProps) => {
  const workspaceId = useWorkspaceId();
  const [openToolbar, setOpenToolbar] = useState(false);
  const closeToolbarTimer = useRef<NodeJS.Timeout>(null);
  const { onOpenMessage, onOpenProfile } = usePanel();
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
                <HoverCard open={openToolbar}>
                  <HoverCardTrigger asChild>
                    <div
                      className={cn(
                        "bg-muted/30 relative w-fit min-w-[100px] rounded-xl rounded-tl-none border p-3 pb-4",
                        isAuthor &&
                          "rounded-xl rounded-tr-none bg-blue-200 text-right",
                        isDeletingMessage &&
                          "origin-bottom scale-y-0 transform bg-red-500/50 transition-all duration-200",
                      )}
                      onMouseEnter={() => {
                        clearTimeout(closeToolbarTimer.current!);
                        setOpenToolbar(true);
                      }}
                      onMouseLeave={() => {
                        closeToolbarTimer.current = setTimeout(() => {
                          setOpenToolbar(false);
                        }, 500);
                      }}
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
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="w-auto p-1"
                    side="top"
                    sideOffset={-10}
                    onMouseEnter={() => {
                      clearTimeout(closeToolbarTimer.current!);
                    }}
                    onMouseLeave={() => {
                      closeToolbarTimer.current = setTimeout(() => {
                        setOpenToolbar(false);
                      }, 500);
                    }}
                  >
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
                  </HoverCardContent>
                </HoverCard>
               
              </div>
               <ThreadBar
                  count={threadCount}
                  timestamp={threadTimestamp}
                  onClick={() => onOpenMessage(id)}
                />
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
        {!isAuthor && (
          <div
            className={cn(
              "relative text-sm font-semibold",
              isAuthor && "text-right",
            )}
          >
            <span onClick={() => onOpenProfile(userId)}>{authorName}</span>
            <div
              className={cn(
                "absolute top-2 left-0 -translate-x-[calc(100%+2px)]",
                isAuthor && "right-0 translate-x-[calc(100%+2px)]",
              )}
            >
              <MemberAvatar name={authorName} className="size-12" />
            </div>
          </div>
        )}
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
            <div className={cn("group flex", isAuthor && "flex-row-reverse")}>
              <HoverCard open={openToolbar}>
                <HoverCardTrigger asChild>
                  <div
                    className={cn(
                      "bg-muted/30 relative w-fit min-w-[100px] rounded-xl rounded-tl-none border p-3 pb-4",
                      isAuthor &&
                        "rounded-xl rounded-tr-none bg-blue-200 text-right",
                      isDeletingMessage &&
                        "origin-bottom scale-y-0 transform bg-red-500/50 transition-all duration-200",
                    )}
                    onMouseEnter={() => {
                      clearTimeout(closeToolbarTimer.current!);
                      setOpenToolbar(true);
                    }}
                    onMouseLeave={() => {
                      closeToolbarTimer.current = setTimeout(() => {
                        setOpenToolbar(false);
                      }, 500);
                    }}
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
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-auto p-1"
                  side="top"
                  sideOffset={-10}
                  onMouseEnter={() => {
                    clearTimeout(closeToolbarTimer.current!);
                  }}
                  onMouseLeave={() => {
                    closeToolbarTimer.current = setTimeout(() => {
                      setOpenToolbar(false);
                    }, 500);
                  }}
                >
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
                </HoverCardContent>
              </HoverCard>
            </div>
            <ThreadBar
              count={threadCount}
              timestamp={threadTimestamp}
              onClick={() => onOpenMessage(id)}
            />
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
};

function formatFullTime(date: Date) {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
}
