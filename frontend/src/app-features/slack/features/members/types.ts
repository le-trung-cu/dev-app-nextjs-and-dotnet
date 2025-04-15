export type Member = {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  email: string;
  role: "Owner" | "Member";
};

export type GetMembersResponseType = {
  isSuccess: boolean;
  members: Member[];
};

export type GetMemberResponseType = {
  isSuccess: boolean;
  member: Member;
};
