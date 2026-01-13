import type z from "zod";
import type { PurchaseSchema, PurchaseSummarySchema} from "../schemas/purchase.schema";

export type TPurchase = z.infer<typeof PurchaseSchema>;

export type TPurchaseSummary = z.infer<typeof PurchaseSummarySchema>;