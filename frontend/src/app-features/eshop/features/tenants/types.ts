import { z } from "zod";
import { Media } from "../media/types";

export const createTenantSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  stripeAcountId: z.string(),
})

export const updateTenantSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  imageId: z.string().optional(),
  stripeAcountId: z.string(),
})

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  lastModified: string;
  image?: Media | null;
  stripeAcountId: string;
}