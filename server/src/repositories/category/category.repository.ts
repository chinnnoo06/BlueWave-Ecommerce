import { Category } from "../../models/Category"
import { TCategory, TCategoryId } from "../../types/category/category.types"
import { TCategoryIdParams } from "../../types/params/params.types"

export const categoryRepository = {

    async findById(categoryId: TCategoryId['_id'] | string) {
        return Category.findById(categoryId)
    },

    async getCategories() {
        return Category.find()
    },

    async findBySlug(slug: TCategory['slug']) {
        return Category.findOne({ slug })
    },

    async addCategory(data: TCategory) {
        return Category.create(data)
    },

    async removeCategory(categoryId: TCategoryIdParams['id']) {
        return Category.findByIdAndDelete(categoryId);
    },

    async updateCategory(categoryId: TCategoryIdParams['id'], data: TCategory) {
        return Category.findByIdAndUpdate(categoryId, data, { new: true })
    },
}
