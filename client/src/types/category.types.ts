import type z from "zod";
import type { CategorySchema } from "../schemas/category.schema";

export type TCategory = z.infer<typeof CategorySchema>