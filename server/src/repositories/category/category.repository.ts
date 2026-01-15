import { Category } from "../../models/Category"
import { TCategory } from "../../types/category/category.types"
import { TMongoId, TMongoIdParams } from "../../types/mongo/mongo.tpyes"

export const categoryRepository = {

    async findById(categoryId: TMongoId['_id'] | string) {
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

    async removeCategory(categoryId: TMongoIdParams['id']) {
        return Category.findByIdAndDelete(categoryId);
    },

    async updateCategory(categoryId: TMongoIdParams['id'], data: TCategory) {
        return Category.findByIdAndUpdate(categoryId, data, { new: true })
    },
}
