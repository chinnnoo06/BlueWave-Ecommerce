import type z from "zod";

import type { ArticleSchema } from "../schemas/article.schema";

export type TArticle = z.infer<typeof ArticleSchema>