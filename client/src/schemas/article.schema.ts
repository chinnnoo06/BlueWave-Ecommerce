import z from "zod";

const ArticleContentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    text: z.string()
  }),
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string()
  }),
  z.object({
    type: z.literal("list"),
    ordered: z.boolean(),
    items: z.array(z.string())
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string()
  })
])

const ArticleSEOSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string()
})

export const ArticleSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  coverImage: z.string(),
  publishedAt: z.string(), // ISO date string
  tags: z.array(z.string()),
  content: z.array(ArticleContentBlockSchema),
  seo: ArticleSEOSchema
})

