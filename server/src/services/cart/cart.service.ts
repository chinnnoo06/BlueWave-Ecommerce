import { Types } from "mongoose";
import { Cart } from "../../models/Cart";
import { TPurchaseItem } from "../../types/purchase/purchase.types";
import { validateProductExist } from "../product/product.service";
import { TUserId } from "../../types/user/user.types";
import { cartRepository } from "../../repositories/cart/cart.repository";

export const validateCartInternal = async (userId: Types.ObjectId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("El carrito esta vacio")
  }

  let total: number = 0
  const purchaseItems: TPurchaseItem[] = []

  for (let i = 0; i < cart.items.length; i++) {
    const productExist = await validateProductExist(cart.items[i].productId)

    if (!productExist) {
      cart.items.splice(i, 1);
      await cart.save();
      throw new Error("Un producto fue eliminado porque ya no existe");
    }

    const color = productExist.colors[cart.items[i].selectedColor ?? 0];

    if (!color) {
      cart.items.splice(i, 1);
      await cart.save();
      throw new Error("Un color fue eliminado porque ya no existe");
    }

    let realPrice = productExist.price

    if (productExist.promotion.active) {
      realPrice = productExist.price - (productExist.price * (productExist.promotion.discountPercentage / 100))
    }

    if (cart.items[i].price !== realPrice) {
      const oldSubtotal = cart.items[i].price * cart.items[i].quantity;
      cart.total -= oldSubtotal

      const newSubtotal = realPrice * cart.items[i].quantity;
      cart.total += newSubtotal

      console.log(realPrice)
      cart.items[i].price = realPrice;

      await cart.save();

      throw new Error(`El producto ${productExist.name} en el color ${productExist.colors[cart.items[i].selectedColor].color} ha cambiado de precio`);
    }

    const subtotal = realPrice * cart.items[i].quantity;
    total += subtotal

    purchaseItems.push({
      productId: productExist._id,
      productName: productExist.name,
      colorImage: color.images?.[0] ?? "",
      colorHex: color.hex,
      quantity: cart.items[i].quantity,
      price: realPrice
    })
  }

  const delivery = total > 499 ? 0 : 50;
  const grandTotal = total + delivery;

  return {
    items: purchaseItems,
    subtotal: total,
    delivery,
    total: grandTotal
  }
}


export const createCartService = async (data: TUserId['_id']) => {
  await cartRepository.create({
    user: data,
    items: [],
    total: 0
  })
}