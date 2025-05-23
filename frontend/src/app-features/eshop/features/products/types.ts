import { z } from "zod";
import { Category } from "../categories/type";
import { Media } from "../media/types";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: Media;
  cover: Media;
  price: number;
  tenantId: string;
  categories: Category[];
  createdAt: string;
  lastModified: string;
}

export const createProductScheme = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categories: z.string(),
  imageId: z.string().optional(),
  coverId: z.string().optional(),
})

export const updateProductScheme = createProductScheme;