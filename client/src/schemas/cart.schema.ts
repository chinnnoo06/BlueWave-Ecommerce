import z from "zod";

export const CartItemSchema = z.object({
    productId: z.string(),
    productName: z.string(),
    productSlug: z.string(),
    category: z.string(),
    colorImage: z.string(),
    selectedColor: z.number(),
    selectedColorHex: z.string(),
    discountPercentage: z.number(),
    quantity: z.number(),
    price: z.number().nonnegative(),
})

export const CartSchema = z.object({
    items: z.array(CartItemSchema),
    delivery: z.number().nonnegative(),
    total: z.number().nonnegative(),
})


export const GuestCartSchema = z.object({
  items: z.array(CartItemSchema),
})
