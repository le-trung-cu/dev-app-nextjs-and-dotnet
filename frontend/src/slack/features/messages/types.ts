export type CreateMessageResponseType = {
  isSuccess: boolean;
  messageId: string;
}

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
}

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
  threads: {
    parentMessageId: string;
    count: number;
  }[];
}

export type MessageMain = Message & {
  threads?: GetMessagesResponseType['threads'][number];
  reactions?: GetMessagesResponseType["reactionCounts"][number][];
}
export type GetMessageByIdResponseType = {
  isSuccess: boolean;
  message: Message,
  threads?: GetMessagesResponseType['threads'][number];
  reactions?: GetMessagesResponseType["reactionCounts"][number][];
}