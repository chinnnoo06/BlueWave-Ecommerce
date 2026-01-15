import { Types } from "mongoose";

export type ArticleContentBlock =
    | {
        type: "paragraph"
        text: string
    }
    | {
        type: "heading"
        level: 2 | 3
        text: string
    }
    | {
        type: "list"
        ordered: boolean
        items: string[]
    }
    | {
        type: "quote"
        text: string
    }

export type ArticleSEO = {
    metaTitle: string
    metaDescription: string
}


export type TArticle = {
    slug: string
    title: string
    excerpt: string
    category: string
    coverImage: string
    publishedAt: string
    tags: string[]
    content: ArticleContentBlock[]
    seo: ArticleSEO
}