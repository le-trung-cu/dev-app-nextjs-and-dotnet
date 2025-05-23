export type Category = {
  id: string;
  name: string;
  slug: string;
  subcategories: Category[];
} 