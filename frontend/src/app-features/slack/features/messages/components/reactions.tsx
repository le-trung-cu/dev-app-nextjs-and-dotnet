import { cn } from "@/lib/utils";
import { useGetCurrentMember } from "../../members/api/use-get-current-member";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { GetMessagesResponseType } from "../types";

type ReactionsProps = {
  className?: string;
  data: Omit<GetMessagesResponseType["reactionCounts"][number], "messageId">[];
  onChange: (value: string) => void;
};
export const Reactions = ({ className, data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useGetCurrentMember({ workspaceId });
  if (data.length === 0 || !currentMember?.id) {
    return null;
  }

  return (
    <div className={cn("mx-5 flex w-full max-w-full flex-wrap items-center gap-2 pt-0.5 pb-1.5", className)}>
      {data.map((item) => {
        const check = item.memberIds.includes(currentMember.id);
        return (
          <span
            key={item.value}
            className={cn(
              "text-muted-foreground inline-flex cursor-pointer items-center rounded-full bg-gray-200 px-2 py-0.5 text-sm",
              check && "border border-blue-500 bg-blue-100/50 text-blue-500",
            )}
            onClick={() => onChange(item.value)}
          >
            {item.value}
            <span className="ml-1 text-xs font-semibold">({item.count})</span>
          </span>
        );
      })}
    </div>
  );
};
