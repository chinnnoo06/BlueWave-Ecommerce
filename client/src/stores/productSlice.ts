import type { StateCreator } from 'zustand'
import type { TProduct } from '../types/product.types'
import { getHomeProducts, getOneProduct, getProducts, getProductsBySearch } from '../services/product.service'
import type { TCategory } from '../types/category.types'
import type { TUserSlice } from './userSlice'

export type TPagination = {
    total: number
    page: number
    itemsPerPage: number
    pages: number
}

export type TProductSlice = {
    homeProducts: TProduct[],
    products: TProduct[] | null,
    pagination: TPagination,
    productSelected: TProduct | null | undefined,
    getHomeProducts: () => Promise<void>,
    getProducts: (category: TCategory['slug'], page: number) => Promise<void>,
    getProductsBySearch: (search: string, page: number) => Promise<void>,
    getOneProduct: (slugId: string) => Promise<void>,
    getSearches: () => string[],
    addSearch: (search: string) => void

}

export const createProductSlice: StateCreator<TProductSlice & TUserSlice, [], [], TProductSlice> = (set, get) => ({
    homeProducts: [],
    products: null,
    pagination: {
        total: 0,
        page: 1,
        itemsPerPage: 9,
        pages: 1,
    },
    productSelected: undefined,

    getHomeProducts: async () => {
        const response = await getHomeProducts()

        if (response) {
            set({
                homeProducts: response
            })
        }
    },

    getProducts: async (category, page) => {
        const response = await getProducts(category, page)

        if (response) {
            set({
                products: response.products,
                pagination: {
                    total: response.total,
                    page: response.page,
                    itemsPerPage: response.itemsPerPage,
                    pages: response.pages,
                }
            })
        }
    },

    getProductsBySearch: async (search, page) => {
        const response = await getProductsBySearch(search, page)

        if (response) {
            set((state) => {
                if (!state.user) return state

                return {
                    products: response.products,
                    pagination: {
                        total: response.total,
                        page: response.page,
                        itemsPerPage: response.itemsPerPage,
                        pages: response.pages,
                    },
                    user: {
                        ...state.user,
                        searches: response.userSearches ?? state.user.searches ?? []
                    }
                }
            })

        }
    },

    getOneProduct: async (slugId) => {
        try {
            const response = await getOneProduct(slugId)

            set({
                productSelected: response,
            })

        } catch (error) {
            set({
                productSelected: null,
            })
        }
    },

    getSearches: () => {
        const user = get().user

        if (user) {
            return user.searches ?? []
        }

        const stored = localStorage.getItem("searches")
        return stored ? JSON.parse(stored) : []
    },

    addSearch: (search: string) => {
        const user = get().user
        const normalized = search.trim()
        if (!normalized) return

        let searches: string[] = user
            ? [...(user.searches ?? [])]
            : JSON.parse(localStorage.getItem("searches") || "[]")

        searches = searches.filter(s => s !== normalized)

        searches.push(normalized)

        if (searches.length > 5) {
            searches = searches.slice(-5)
        }

        if (user) {
            set({
                user: {
                    ...user,
                    searches
                }
            })
        } else {
            localStorage.setItem("searches", JSON.stringify(searches))
        }
    },


})

