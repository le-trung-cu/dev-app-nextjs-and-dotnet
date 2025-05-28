import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().nullable(),
  file: z.instanceof(File).nullable(),
});

export const initeMembersSchema = z.object({
  role: z.string(),
  userIds: z.array(z.string()),
})

export type Organization = {
  id: string;
  name: string;
  slug: string;
  imgUrl: string;
  members: Member[];
}

export type Member = {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  name: string;
  email: string;
  isJoined: boolean;
}
