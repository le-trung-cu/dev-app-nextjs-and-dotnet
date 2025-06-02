export type Document = {
  id: string;
  title: string;
  initialContent: string | null;
  ownerId: string;
  roomId: string;
  organizationId: string;
  createdAt: string;
};

export type GetDocumentsResponseType = {
  isSuccess: boolean;
  data: Document[];
  count: number;
  pageIndex: number;
  pageSize: number;
  documents: Document[];
};
