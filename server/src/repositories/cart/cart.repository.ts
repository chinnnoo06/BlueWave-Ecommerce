import { Cart } from "../../models/Cart"
import { TCart } from "../../types/cart/cart.types"
import { TMongoId } from "../../types/mongo/mongo.tpyes"
import { Document } from "mongoose"

type TCartDocument = Document & TCart

export const cartRepository = {

  async create(data: Partial<TCart>) {
    return Cart.create(data)
  },

  async findByUser(userId: TMongoId['_id']) {
    return Cart.findOne({ user: userId });
  },

  async save(cart: TCartDocument) {
    return cart.save()
  },

  async getCart(userId: TMongoId['_id']) {
    return Cart.findOne({ user: userId })
      .populate({
        path: "items.productId",
        select: "name colors"
      })
      .lean();
  },

  async cartResponse(cartId: TMongoId['_id']) {
    return Cart.findById(cartId)
      .populate({
        path: "items.productId",
        populate: {
          path: "category",
          select: "name"
        }
      })
      .lean();
  }
} 