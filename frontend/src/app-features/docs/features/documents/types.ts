export type Document = {
  title: string;
  initialContent: string | null;
  ownerId: string;
  roomId: string;
  organizationId: string;
};

export type GetDocumentsResponseType = {
  isSuccess: boolean;
  data: Document[];
  count: number;
  pageIndex: number;
  pageSize: number;
};
