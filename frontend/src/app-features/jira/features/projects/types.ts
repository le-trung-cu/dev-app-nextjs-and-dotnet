import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  imgUrl: z.string().nullable(),
  file: z.instanceof(File).nullable(),
});

export type Project = {
  id: string;
  name: string;
  imgUrl: string;
}

export type GetProjectsByWorkspaceIdResponseType = {
  isSuccess: boolean;
  projects: Project[];
}