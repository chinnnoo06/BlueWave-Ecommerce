import type z from "zod";
import type { ProductSchema } from "../schemas/product.schema";

export type TProduct = z.infer<typeof ProductSchema>

