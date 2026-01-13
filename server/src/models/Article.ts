import { Schema, model } from "mongoose"
import type { ArticleContentBlock, ArticleSEO, TArticle } from "../types/article/article.types"

/* -------------------------------------------------------------------------- */
/*                                   SEO                                      */
/* -------------------------------------------------------------------------- */

const ArticleSEOSchema = new Schema<ArticleSEO>(
  {
    metaTitle: {
      type: String,
      required: true
    },
    metaDescription: {
      type: String,
      required: true
    }
  },
  { _id: false }
)

/* -------------------------------------------------------------------------- */
/*                             CONTENT BLOCK                                  */
/* -------------------------------------------------------------------------- */

const ArticleContentBlockSchema = new Schema <ArticleContentBlock>(
  {
    type: {
      type: String,
      required: true,
      enum: ["paragraph", "heading", "list", "quote"]
    },

    text: {
      type: String,
      required: function () {
        return this.type !== "list"
      }
    },

    level: {
      type: Number,
      enum: [2, 3],
      required: function () {
        return this.type === "heading"
      }
    },

    ordered: {
      type: Boolean,
      required: function () {
        return this.type === "list"
      }
    },

    items: {
      type: [String],
      required: function () {
        return this.type === "list"
      }
    }
  },
  { _id: false }
)


/* -------------------------------------------------------------------------- */
/*                                  ARTICLE                                   */
/* -------------------------------------------------------------------------- */

const ArticleSchema = new Schema<TArticle>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    title: {
      type: String,
      required: true
    },

    excerpt: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    coverImage: {
      type: String,
      required: true
    },

    publishedAt: {
      type: String,
      required: true
    },

    tags: {
      type: [String],
      default: []
    },

    content: {
      type: [ArticleContentBlockSchema],
      required: true
    },

    seo: {
      type: ArticleSEOSchema,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const Article = model<TArticle>("Article", ArticleSchema, "articles")
