import z from "zod";

export const CategorySchema = z.object({
  _id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string()
})