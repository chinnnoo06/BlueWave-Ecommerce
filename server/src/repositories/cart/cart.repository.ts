import { Cart } from "../../models/Cart"
import { TCart, TCartId, TCartItem } from "../../types/cart/cart.types"
import { TReqToCart } from "../../types/params/params.types"
import { TUserId } from "../../types/user/user.types"
import { Document } from "mongoose"

type TCartDocument = Document & TCart

export const cartRepository = {

  async create(data: Partial<TCart>) {
    return Cart.create(data)
  },

  async findByUser(userId: TUserId['_id']) {
    return Cart.findOne({ user: userId });
  },

  async save(cart: TCartDocument) {
    return cart.save()
  },

  async updateProductInCart(userId: TUserId['_id'], delivery: number, newTotal: number, data: TReqToCart) {
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

  async addProductInCart(userId: TUserId['_id'], cartItem: TCartItem, delivery: number, newTotal: number) {
    return Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: cartItem }, $set: { delivery: delivery, total: newTotal } },
      { new: true });
  },

  async decreaseProductInCart(userId: TUserId['_id'], delivery: number, newTotal: number, data: TReqToCart) {
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

  async decreaseAndRemoveProductInCart(userId: TUserId['_id'], setUpdate: any, data: TReqToCart) {
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

  async removeProductInCart(userId: TUserId['_id'], setUpdate: any, data: TReqToCart) {
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

  async clearCart(userId: TUserId['_id']) {
    return Cart.findOneAndUpdate({ user: userId }, {
      items: [],
      delivery: 50,
      total: 0
    }, { new: true });
  },

  async getCart(userId: TUserId['_id']) {
    return Cart.findOne({ user: userId })
      .populate({
        path: "items.productId",
        select: "name colors"
      })
      .lean();
  },

  async loadLsCart(userId: TUserId['_id'], data: TCart) {
    return Cart.findOneAndUpdate({ user: userId }, data, { new: true })
  },

  async cartResponse(cartId: TCartId['_id']) {
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