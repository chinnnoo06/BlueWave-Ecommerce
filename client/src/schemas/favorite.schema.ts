import { ProductSchema } from "./product.schema";

export const FavoriteSchema = ProductSchema.omit({
  description: true
});