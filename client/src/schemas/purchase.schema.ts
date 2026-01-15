import z from "zod";

const PurchaseItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productSlug: z.string(),
  colorImage: z.string(),
  colorHex: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
});

export const PurchaseSchema = z.object({
  _id: z.string(),
  items: z.array(PurchaseItemSchema),
  total: z.number().nonnegative(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const PurchaseSummarySchema = z.object({
  items: z.array(PurchaseItemSchema),
  subtotal: z.number().nonnegative(),
  delivery: z.number().nonnegative(),
  total: z.number().nonnegative(),
});