import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1),
});

export const updateWorkspaceSchema = createWorkspaceSchema;

export type Workspace = {
  id: string;
  name: string;
  inviteToken?: string | null;
}

export type GetWorkspacesResponseType = {
  isSuccess: boolean;
  workspaces: Workspace[];
}

export type GetWorkspaceByIdResponseType = {
  isSuccess: boolean;
  workspace: Workspace;
}
