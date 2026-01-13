import type z from "zod";
import type { StateSchema } from "../schemas/geo.schema";

export type TState = z.infer<typeof StateSchema>