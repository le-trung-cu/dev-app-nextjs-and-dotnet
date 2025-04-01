import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1),
  imgUrl: z.string().nullable(),
  file: z.instanceof(File).nullable(),
});

