import type { StateCreator } from 'zustand'
import { getArtciles, getArticlesInitials, getOneArticle } from '../services/article.service'
import type { TArticle } from '../types/article.types'

export type TArticleSlice = {
    articles: TArticle[],
    articlesInitials: TArticle[],
    articleSelected: TArticle | null,
    getArticles: () => Promise<void>
    getArticlesInitials: (id?: TArticle['_id']) => Promise<void>
    getOneArticle: (slug: TArticle['slug']) => Promise<void>
}

export const createArticleSlice: StateCreator<TArticleSlice> = (set) => ({
    articles: [],

    articlesInitials: [],

    articleSelected: null,

    getArticles: async () => {
        const response = await getArtciles()

        if (response) {
            set({
                articles: response
            })
        }
    },

    getArticlesInitials: async (id) => {
        const response = await getArticlesInitials(id)

        if (response) {
            set({
                articlesInitials: response
            })
        }
    },

    getOneArticle: async (slug) => {
        const response = await getOneArticle(slug)

        if (response) {
            set({
                articleSelected: response
            })
        }
    }
})

