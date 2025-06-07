export type CreateMessageResponseType = {
  isSuccess: boolean;
  messageId: string;
};

export type Message = {
  id: string;
  body: string;
  imgUrl: string;
  memberId: string;
  createdAt: string;
  lastModified: string;
  channelId: string;
  workspaceId: string;
  parentMessageId: string;
  conversationId: string;
};
export type PaginationMessages = {
  cursor: string;
  pageSize: number;
  ids: Message["id"][];
  messages: Record<
    Message["id"],
    {
      message: Message;
      reactions: {
        count: number;
        value: string;
        memberIds: string[];
      }[];
      threads?: {
        count: number;
        timestamp: string;
      };
    }
  >;
};

export type GetMessagesResponseType = {
  isSuccess: boolean;
  data: Message[];
  count: number;
  cursor: string;
  pageSize: number;
  reactionCounts: {
    messageId: string;
    count: number;
    value: string;
    memberIds: string[];
  }[];
  threads?: {
    parentMessageId: string;
    count: number;
    timestamp: string;
  }[];
};

export type MessageMain = {
  message: Message,
  threads?: GetMessagesResponseType["threads"][number];
  reactions?: GetMessagesResponseType["reactionCounts"][number][];
};
export type GetMessageByIdResponseType = {
  isSuccess: boolean;
  message: Message;
  threads?: GetMessagesResponseType["threads"][number];
  reactions?: GetMessagesResponseType["reactionCounts"][number][];
};
