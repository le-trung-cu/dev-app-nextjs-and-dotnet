import { useSignalREffect } from "@/slack/components/signalr-provider";
import { useQueryClient } from "@tanstack/react-query";
import { Message, MessageMain } from "../types";

export const useSignalRMessage = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = useQueryClient();

  useSignalREffect(
    `slack:${workspaceId}:messages`,
    (message: Message) => {
      console.log(message);
      queryClient.setQueryData(
        ["messages", workspaceId, message.channelId, message.parentMessageId],
        (oldData: any) => {
          debugger
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              pageParams:[message.id],
              pages: [{
                cursor: message.id,
                data: [message],
                reactionCounts: [],
                threads: [],
              }],
            };
          }
          console.log("Old data", oldData);
          const newData = [...oldData.pages];

          newData[0] = {
            ...newData[0],
            data: [message, ...newData[0].data],
          };

          console.log("new Data", newData);

          return {
            ...oldData,
            pages: newData,
          };
        },
      );
    },
    [workspaceId],
  );
};
