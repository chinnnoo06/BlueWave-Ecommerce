import { TPurchaseItem } from "../../types/purchase/purchase.types";
import { getProductInLsCartService, validateProductByIdService } from "../product/product.service";
import { cartRepository } from "../../repositories/cart/cart.repository";
import { TReqToCart } from "../../types/params/params.types";
import { HttpError } from "../../helpers";
import { TCartItem, TCartLSBody } from "../../types/cart/cart.types";
import { buildCartResponse } from "./cart.mapper";
import { TMongoId } from "../../types/mongo/mongo.tpyes";

type TProductInCart = {
  exist: boolean,
  quantity: number,
  price: number
}

export const validateCartInternalService = async (userId: TMongoId['_id']) => {
  const cart = await cartRepository.findByUser(userId)

  if (!cart || cart.items.length === 0) {
    throw new HttpError(400, "El carrito esta vacio");
  }

  let total: number = 0
  const purchaseItems: TPurchaseItem[] = []

  for (let i = 0; i < cart.items.length; i++) {

    const productExist = await validateProductByIdService(cart.items[i].productId)

    if (!productExist) {
      const oldSubtotal = cart.items[i].price * cart.items[i].quantity;
      cart.total -= oldSubtotal

      cart.delivery = 50

      if (cart.total > 499) {
        cart.delivery = 0
      }

      cart.items.splice(i, 1);
      await cartRepository.save(cart)
      throw new HttpError(404, "Un producto fue eliminado porque ya no existe");
    }

    const color = productExist.colors[cart.items[i].selectedColor ?? 0];

    if (!color) {
      const oldSubtotal = cart.items[i].price * cart.items[i].quantity;
      cart.total -= oldSubtotal

      cart.delivery = 50

      if (cart.total > 499) {
        cart.delivery = 0
      }

      cart.items.splice(i, 1);
      await cartRepository.save(cart)
      throw new HttpError(404, "Un color fue eliminado porque ya no existe");
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

      cart.items[i].price = realPrice;

      cart.delivery = 50

      if (cart.total > 499) {
        cart.delivery = 0
      }

      await cartRepository.save(cart)

      throw new HttpError(400, `El producto ${productExist.name} en el color ${productExist.colors[cart.items[i].selectedColor].color} ha cambiado de precio`);
    }

    const subtotal = realPrice * cart.items[i].quantity;
    total += subtotal

    purchaseItems.push({
      productId: productExist._id,
      productName: productExist.name,
      productSlug: productExist.slug,
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


export const createCartService = async (userId: TMongoId['_id']) => {
  await cartRepository.create({
    user: userId,
    items: [],
    total: 0
  })
}

export const addToCartService = async (userId: TMongoId['_id'], data: TReqToCart) => {

  const productExist = await validateProductByIdService(data.productId)
  const maxIndex = productExist.colors.length - 1;

  if (!productExist || data.selectedColor > maxIndex) throw new HttpError(400, "Producto o color invalido");

  const actualCart = await cartRepository.findByUser(userId)

  if (!actualCart) throw new HttpError(404, "No existe el card");

  const productInCart: TProductInCart = { exist: false, quantity: 1, price: 0 }

  for (let i = 0; i < actualCart.items.length; i++) {

    if (actualCart.items[i].productId.equals(data.productId) && actualCart.items[i].selectedColor === data.selectedColor) {
      productInCart.exist = true
      productInCart.quantity = actualCart.items[i].quantity
      productInCart.price = actualCart.items[i].price
    }
  }

  let newTotal: number = 0
  let delivery: number

  if (productInCart.exist) {
    newTotal = actualCart.total + productInCart.price

    delivery = newTotal > 499 ? 0 : 50

    await cartRepository.updateProductInCart(userId, delivery, newTotal, data)

  } else {

    let priceReal: number = 0

    let discountPercentage: number = 0

    if (productExist.promotion.active) {
      priceReal = (productExist.price) - (productExist.price * (productExist.promotion.discountPercentage / 100))
      discountPercentage = productExist.promotion.discountPercentage
    } else {
      priceReal = productExist.price
    }

    newTotal = actualCart.total + priceReal

    delivery = newTotal > 499 ? 0 : 50

    const cartItem: TCartItem = {
      productId: data.productId,
      selectedColor: data.selectedColor,
      price: priceReal,
      discountPercentage: discountPercentage,
      quantity: 1
    };

    await cartRepository.addProductInCart(userId, cartItem, delivery, newTotal)
  }

  const cartResponse = await buildCartResponse(actualCart._id);

  return cartResponse
}


export const decreaseToCartService = async (userId: TMongoId['_id'], data: TReqToCart) => {

  const productExist = await validateProductByIdService(data.productId)
  const maxIndex = productExist.colors.length - 1;

  if (!productExist || data.selectedColor > maxIndex) throw new HttpError(400, "Producto o color invalido");

  const actualCart = await cartRepository.findByUser(userId)

  if (!actualCart) throw new HttpError(404, "No existe el card");

  const productInCart: TProductInCart = {
    exist: false,
    quantity: 1,
    price: 0
  }

  for (let i = 0; i < actualCart.items.length; i++) {
    if (actualCart.items[i].productId.equals(data.productId) && actualCart.items[i].selectedColor === data.selectedColor) {
      productInCart.exist = true
      productInCart.quantity = actualCart.items[i].quantity
      productInCart.price = actualCart.items[i].price
    }
  }

  let newTotal: number = actualCart.total - productInCart.price
  let delivery = newTotal > 499 ? 0 : 50

  const setUpdate: { delivery: number, total: number; } = { delivery: delivery, total: newTotal };

  if (productInCart.exist) {
    if (productInCart.quantity > 1) {
      await cartRepository.decreaseProductInCart(userId, delivery, newTotal, data)
    } else {
      await cartRepository.decreaseAndRemoveProductInCart(userId, setUpdate, data)
    }
  } else {
    throw new HttpError(404, "Producto en cart no encontrado");
  }

  const cartResponse = await buildCartResponse(actualCart._id);

  return cartResponse
}

export const removeItemCartService = async (userId: TMongoId['_id'], data: TReqToCart) => {
  const productExist = await validateProductByIdService(data.productId)
  const maxIndex = productExist.colors.length - 1;

  if (!productExist || data.selectedColor > maxIndex) throw new HttpError(400, "Producto o color invalido");

  const actualCart = await cartRepository.findByUser(userId)

  if (!actualCart) throw new HttpError(404, "No existe el card");

  const productInCart: TProductInCart = {
    exist: false,
    quantity: 1,
    price: 0
  }

  for (let i = 0; i < actualCart.items.length; i++) {
    if (actualCart.items[i].productId.equals(data.productId) && actualCart.items[i].selectedColor === data.selectedColor) {
      productInCart.exist = true
      productInCart.quantity = actualCart.items[i].quantity
      productInCart.price = actualCart.items[i].price
    }
  }

  let newTotal: number = actualCart.total - (productInCart.price * productInCart.quantity)
  let delivery = newTotal > 499 ? 0 : 50

  const setUpdate: { delivery: number, total: number; } = { delivery: delivery, total: newTotal };

  if (productInCart.exist) {
    await cartRepository.removeProductInCart(userId, setUpdate, data)
  } else {
    throw new HttpError(404, "Producto en cart no encontrado");
  }

  const cartResponse = await buildCartResponse(actualCart._id);

  return cartResponse
}

export const clearCartService = async (userId: TMongoId['_id']) => {
  const cart = await cartRepository.clearCart(userId)

  if (!cart) {
    throw new HttpError(404, "Cart no encontrado");
  }

  return cart
}

export const getCartService = async (userId: TMongoId['_id']) => {
  const cart = await cartRepository.getCart(userId)

  if (!cart) {
    throw new HttpError(404, "Cart no encontrado");
  }

  const cartResponse = await buildCartResponse(cart._id);

  return cartResponse
}

export const getLsCartService = async (data: TCartLSBody) => {
  const { items } = data

  if (!items || !Array.isArray(items)) {
    throw new Error("Items inválidos");
  }

  const responseItems = [];

  for (const item of items) {
    const productExist = await getProductInLsCartService(item.productId)

    if (!productExist) throw new HttpError(404, "Producto no encontrado");

    const maxIndex = productExist.colors.length - 1;
    if (item.selectedColor > maxIndex) {
      throw new HttpError(400, "Color inválido");
    }

    let realPrice: number = 0
    let discountPercentage: number = 0

    if (productExist.promotion.active) {
      realPrice = (productExist.price) - (productExist.price * (productExist.promotion.discountPercentage / 100))
      discountPercentage = productExist.promotion.discountPercentage
    } else {
      realPrice = productExist.price
    }

    responseItems.push({
      productId: productExist._id,
      productName: productExist.name,
      productSlug: productExist.slug,
      category: (productExist.category as any)?.name ?? "",
      colorImage: productExist.colors[item.selectedColor].images[0],
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedColorHex: productExist.colors[item.selectedColor].hex,
      discountPercentage: discountPercentage,
      price: realPrice
    });
  }

  return responseItems
}

export const loadLSCardService = async (userId: TMongoId['_id'], data: TCartLSBody) => {
  const { items } = data

  if (!items || !Array.isArray(items)) {
    throw new HttpError(400, "Items inválidos");
  }

  let cart = await cartRepository.findByUser(userId)

  if (!cart) throw new HttpError(404, "Cart no encontrado");

  // añadir items actuales
  const itemsMap = new Map<string, TCartItem>()

  for (const item of cart.items) {
    const key = `${item.productId.toString()}-${item.selectedColor}`
    itemsMap.set(key, item)
  }

  for (const item of items) {
    const productExist = await validateProductByIdService(item.productId)
    const maxIndex = productExist.colors.length - 1;

    if (!productExist || item.selectedColor > maxIndex) throw new HttpError(400, "Producto o color invalido");

    let realPrice: number = 0
    let discountPercentage: number = 0

    if (productExist.promotion.active) {
      realPrice = (productExist.price) - (productExist.price * (productExist.promotion.discountPercentage / 100))
      discountPercentage = productExist.promotion.discountPercentage
    } else {
      realPrice = productExist.price
    }

    const key = `${productExist._id.toString()}-${item.selectedColor}`

    if (itemsMap.has(key)) {
      // si ya existe → sumar cantidad
      const existingItem = itemsMap.get(key)!
      existingItem.quantity += item.quantity
      existingItem.price = realPrice
      existingItem.discountPercentage = discountPercentage
    } else {
      // ➕ Nuevo item
      itemsMap.set(key, {
        productId: productExist._id,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
        price: realPrice,
        discountPercentage
      })
    }
  }

  const mergedItems = Array.from(itemsMap.values()) // convertir a array 

  let total = 0

  for (const item of mergedItems) {
    total += item.price * item.quantity
  }

  const delivery = total > 499 ? 0 : 50

  cart.items = mergedItems
  cart.total = total
  cart.delivery = delivery

  await cartRepository.loadLsCart(userId, cart)

  const cartResponse = await buildCartResponse(cart._id);

  return cartResponse
}