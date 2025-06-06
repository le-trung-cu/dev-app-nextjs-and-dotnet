export type Member = {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  email: string;
  role: "Admin" | "Member";
};

export type GetMembersResponseType = {
  isSuccess: boolean;
  members: Member[];
};

export type GetMemberResponseType = {
  isSuccess: boolean;
  member: Member;
};


export enum MemberRole {
  Admin = 'Admin',
  Member = 'Member'
}