import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1),
  imgUrl: z.string().nullable(),
  file: z.instanceof(File).nullable(),
});

export const updateWorkspaceSchema = createWorkspaceSchema;

export type Workspace = {
  id: string;
  name: string;
  imgUrl: string;
  inviteToken?: string | null;
  members: []
}

export type GetWorkspacesResponseType = {
  isSuccess: boolean;
  workspaces: Workspace[];
}

export type GetWorkspaceByIdResponseType = {
  isSuccess: boolean;
  workspace: Workspace;
}
