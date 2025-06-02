export type Member = {
  id: string;
  workspaceId: string;
  userId: string;
  role: string;
  name: string;
  email: string;
}

export type GetMemberResponseType = {
  isSuccess: boolean;
  members: Member[];
}

export enum MemberRole {
  Admin = 'Admin',
  Member = 'Member'
}