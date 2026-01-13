import type z from "zod";
import type { SearchFormSchema } from "../schemas/search.schema";

export type TSearchForm = z.infer<typeof SearchFormSchema>
