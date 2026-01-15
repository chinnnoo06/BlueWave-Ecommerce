import { Product } from "../../models/Product"
import { TProductIdParams } from "../../types/params/params.types"
import { TProduct, TProductId, TPromotion } from "../../types/product/product.types"
import { TUser } from "../../types/user/user.types"

export const productRepository = {

    async findById(id: TProductId['_id'] | string) {
        return Product.findById(id)
    },

    async getProductInLsCart(productId: TProductId['_id']) {
        return Product.findById(productId)
            .populate({
                path: "category",
                select: "name"
            })
            .lean();
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
    },

    async getProducts(filter: any) {
        return Product.find(filter)
            .populate("category", "name")
            .lean()
    },

    async getCarouselProducts() {
        return Product.aggregate([
            { $sample: { size: 8 } },
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
                    category: "$category.name" // SOLO el nombre
                }
            }
        ]);
    },

    async getOneProduct(id: TProductIdParams['id']) {
        return Product.findById(id)
            .populate("category", "name")
            .lean()
    },

    async getProductsSearch(regex: RegExp) {
        return Product.find({ name: { $regex: regex } })
            .populate("category", "name")
            .lean();
    },

    async addProduct(data: TProduct) {
        return Product.create(data)
    },

    async updatedProduct(productId: TProductIdParams['id'], data: TProduct) {
        return Product.findByIdAndUpdate(productId, data);
    },

    async removeProduct(productId: TProductIdParams['id']) {
        return Product.findByIdAndDelete(productId);
    },

    async addPromotion(productId: TProductIdParams['id'], data: TPromotion) {
        return Product.findByIdAndUpdate(productId, { promotion: data }, { new: true })
    },

    async removePromotion(productId: TProductIdParams['id']) {
        return Product.findByIdAndUpdate(productId, {
            promotion: {
                active: false,
                discountPercentage: 0
            }
        }, { new: true })
    }

}
