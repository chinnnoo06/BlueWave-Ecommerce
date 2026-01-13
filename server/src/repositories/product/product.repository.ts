import { Product } from "../../models/Product"
import { TProductId } from "../../types/product/product.types"
import { TUser } from "../../types/user/user.types"

export const productRepository = {

    async findById(id: TProductId['_id']) {
        return Product.findById(id)
    },

    async getFavoriteProducts(favoritesIds: TUser['favorites']) {
        return await Product.aggregate([
            {
                $match: {
                    _id: { $in: favoritesIds }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    category: "$category.name"
                }
            },
            {
                $project: {
                    description: 0
                }
            }
        ])
    }

}
