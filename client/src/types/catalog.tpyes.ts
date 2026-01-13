import type z from "zod";
import type { ResponseCatalogSchema } from "../schemas/catalog.schema";

export type TResponseCatalogSchema = z.infer<typeof ResponseCatalogSchema>