import { z } from "zod";


export const createMediaSchema = z.object({
  alt: z.string(),
  file: z.instanceof(File),
});

export type Media = {
  id: string;
  name: string;
  path: string;
  alt: string;
} 