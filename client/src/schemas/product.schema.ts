import z from "zod";

const ColorSchema = z.object({
  color: z.string(),
  images: z.array(z.string()),
  hex: z.string(),
})

const PromotionSchema = z.object({
  active: z.boolean(),
  discountPercentage: z.number()
})

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  colors: z.array(ColorSchema),
  promotion: PromotionSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})