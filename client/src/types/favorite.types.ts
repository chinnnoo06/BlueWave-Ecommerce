import type z from "zod";
import type { FavoriteSchema } from "../schemas/favorite.schema";

export type TFavorite = z.infer<typeof FavoriteSchema>;