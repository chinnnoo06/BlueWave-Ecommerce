import { Cart } from "../../models/Cart"
import { TCart, TCartItem } from "../../types/cart/cart.types"
import { TMongoId } from "../../types/mongo/mongo.tpyes"
import { TReqToCart } from "../../types/params/params.types"
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

  async updateProductInCart(userId: TMongoId['_id'], delivery: number, newTotal: number, data: TReqToCart) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $inc: { "items.$[item].quantity": 1 },
        $set: { delivery, total: newTotal }
      },
      {
        arrayFilters: [
          {
            "item.productId": data.productId,
            "item.selectedColor": data.selectedColor
          }
        ],
        new: true
      }
    );
  },

  async addProductInCart(userId: TMongoId['_id'], cartItem: TCartItem, delivery: number, newTotal: number) {
    return Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: cartItem }, $set: { delivery: delivery, total: newTotal } },
      { new: true });
  },

  async decreaseProductInCart(userId: TMongoId['_id'], delivery: number, newTotal: number, data: TReqToCart) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $inc: { "items.$[item].quantity": -1 },
        $set: { delivery, total: newTotal }
      },
      {
        arrayFilters: [
          {
            "item.productId": data.productId,
            "item.selectedColor": data.selectedColor
          }
        ],
        new: true
      }
    );
  },

  async decreaseAndRemoveProductInCart(userId: TMongoId['_id'], setUpdate: any, data: TReqToCart) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            productId: data.productId,
            selectedColor: data.selectedColor
          }
        },
        $set: setUpdate
      },
      { new: true }
    );
  },

  async removeProductInCart(userId: TMongoId['_id'], setUpdate: any, data: TReqToCart) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            productId: data.productId,
            selectedColor: data.selectedColor
          }
        },
        $set: setUpdate
      },
      { new: true }
    );
  },

  async clearCart(userId: TMongoId['_id']) {
    return Cart.findOneAndUpdate({ user: userId }, {
      items: [],
      delivery: 50,
      total: 0
    }, { new: true });
  },

  async getCart(userId: TMongoId['_id']) {
    return Cart.findOne({ user: userId })
      .populate({
        path: "items.productId",
        select: "name colors"
      })
      .lean();
  },

  async loadLsCart(userId: TMongoId['_id'], data: TCart) {
    return Cart.findOneAndUpdate({ user: userId }, data, { new: true })
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