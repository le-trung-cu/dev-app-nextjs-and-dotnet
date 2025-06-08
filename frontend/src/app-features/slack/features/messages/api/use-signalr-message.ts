import { useSignalREffect } from "@/app-features/slack/components/signalr-provider";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { Message, PaginationMessages } from "../types";

export const useSignalRMessage = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = useQueryClient();
  useSignalREffect(
    `slack:${workspaceId}:messages`,
    (message: Message) => {
      console.log("created message", { message });

      if (!message.parentMessageId) {
        queryClient.setQueryData(
          [
            "messages",
            workspaceId,
            message.channelId,
            null,
            message.conversationId,
          ],
          (oldData: { pageParams: string[]; pages: PaginationMessages[] }) => {
            console.log("oldData 1", { oldData });
            if (!oldData || !oldData.pages || oldData.pages.length === 0) {
              return {
                pageParams: [message.id],
                pages: [
                  {
                    cursor: message.id,
                    data: [message],
                    reactionCounts: [],
                    threads: [],
                  },
                ],
              };
            }

            const newData = [...oldData.pages];
            newData[0] = {
              ...newData[0],
              ids: [message.id, ...newData[0].ids],
              messages: {
                ...newData[0].messages,
                [message.id]: {
                  message,
                  threads: { count: 0, timestamp: message.createdAt },
                  reactions: [],
                },
              },
            };

            return {
              ...oldData,
              pages: newData,
            };
          },
        );
      }

      if (!!message.parentMessageId) {
        queryClient.setQueryData(
          [
            "messages",
            workspaceId,
            message.channelId,
            null,
            message.conversationId,
          ],
          (oldData: { pageParams: string[]; pages: PaginationMessages[] }) => {
            console.log("oldData 2", { oldData });

            const newData = oldData.pages.map((page) => {
              if (page.messages[message.parentMessageId] == undefined) {
                return page;
              }
              return {
                ...page,
                ids: [...page.ids],
                messages: {
                  ...page.messages,
                  [message.parentMessageId]: {
                    ...page.messages[message.parentMessageId],
                    threads: {
                      count:
                        (page.messages[message.parentMessageId].threads
                          ?.count ?? 0) + 1,
                      timestamp: message.createdAt,
                    },
                  },
                },
              };
            });
            return {
              ...oldData,
              pages: newData,
            };
          },
        );

        queryClient.setQueryData(
          [
            "messages",
            workspaceId,
            message.channelId,
            message.parentMessageId,
            null,
          ],
          (oldData?: InfiniteData<PaginationMessages>) => {
            if (!oldData || oldData.pages.length === 0) {
              return oldData;
              // return {
              //   pageParams: [null],
              //   pages: [
              //     {
              //       cursor: message.id,
              //       pageSize: 10,
              //       ids: [message.id],
              //       messages: {
              //         [message.id]: {
              //           message,
              //           threads: { count: 0, timestamp: message.createdAt },
              //           reactions: [],
              //         },
              //       },
              //     },
              //   ],
              // };
            }

            const firstPage = oldData.pages[0];

            // Avoid duplicate message
            if (firstPage.ids.includes(message.id)) return oldData;

            const updatedFirstPage: PaginationMessages = {
              ...firstPage,
              ids: [message.id, ...firstPage.ids],
              messages: {
                ...firstPage.messages,
                [message.id]: {
                  message,
                  threads: { count: 0, timestamp: message.createdAt },
                  reactions: [],
                },
              },
            };

            return {
              ...oldData,
              pages: [updatedFirstPage, ...oldData.pages.slice(1)],
            };
          },
        );
      }
    },
    [workspaceId],
  );

  useSignalREffect(
    `slack:${workspaceId}:messages:update`,
    (message: Message) => {
      queryClient.setQueryData(
        [
          "messages",
          workspaceId,
          message.channelId,
          message.parentMessageId,
          message.conversationId,
        ],
        (oldData: { pageParams: string[]; pages: PaginationMessages[] }) => {
          console.log("oldDate", oldData);
          const newData = oldData.pages.map((page) => {
            if (page.messages[message.id] == undefined) {
              return page;
            }
            return {
              ...page,
              ids: [...page.ids],
              messages: {
                ...page.messages,
                [message.id]: {
                  ...page.messages[message.id],
                  message,
                },
              },
            };
          });
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
