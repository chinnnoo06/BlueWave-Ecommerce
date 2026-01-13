import z from "zod";
import { ProductSchema } from "./product.schema";

export const ResponseCatalogSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema),
  total: z.number(),
  page: z.number(),
  itemsPerPage: z.number(),
  pages: z.number(),
  userSearches: z.array(z.string()).optional(),
})