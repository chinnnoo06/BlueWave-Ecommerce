import type { StateCreator } from 'zustand'
import { getCategories } from '../services/category.service'
import type { TCategory } from '../types/category.types'

export type TCategorySlice = {
    categories: TCategory[],
    getCategories: () => Promise<void>
}

export const createCategorySlice: StateCreator<TCategorySlice> = (set) => ({
    categories: [],

    getCategories: async () => {
        const response = await getCategories()

        if (response) {
            set({
                categories: response
            })
        }
    }
})

