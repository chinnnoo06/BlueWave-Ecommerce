import { Cart } from "../../models/Cart"
import { TCart } from "../../types/cart/cart.types"

export const cartRepository = {
  
  create(data: Partial<TCart>) {
    return Cart.create(data)
  },



}