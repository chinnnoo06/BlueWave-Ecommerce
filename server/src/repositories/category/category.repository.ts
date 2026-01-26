import { Category } from "../../models/Category"
import { TCategory, TCategoryDocument } from "../../types/category/category.types"
import { TMongoId } from "../../types/mongo/mongo.tpyes"

export const categoryRepository = {
    async findById(categoryId: TMongoId['_id'] | string) {
        return Category.findById(categoryId)
    },

    async save(category: TCategoryDocument) {
        return category.save()
    },

    async deleteOne(category: TCategoryDocument) {
        return category.deleteOne()
    },

    async getCategories() {
        return Category.find()
    },

    async findBySlug(slug: TCategory['slug']) {
        return Category.findOne({ slug })
    },

    async addCategory(data: TCategory) {
        return Category.create(data)
    }
}
