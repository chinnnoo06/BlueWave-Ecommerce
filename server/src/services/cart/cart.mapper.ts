import { HttpError } from "../../helpers";
import { cartRepository } from "../../repositories/cart/cart.repository";
import { TMongoId } from "../../types/mongo/mongo.tpyes";
import { TProductwithID } from "../../types/product/product.types";

export const buildCartResponse = async (cartId: TMongoId['_id']) => {
  const cart = await cartRepository.cartResponse(cartId)

  if (!cart) throw new HttpError(404, "Cart no encontrado");

  const itemsWithImages = cart.items.map(item => {
    const product = item.productId as unknown;

    if (
      !product ||
      typeof product !== "object" ||
      !("name" in product) ||
      !("colors" in product) ||
      !("category" in product)
    ) {
      throw new HttpError(400, "Producto no poblado correctamente");
    }

    const typedProduct = product as TProductwithID;

    return {
      productId: typedProduct._id,
      productName: typedProduct.name,
      productSlug: typedProduct.slug,
      category: (typedProduct.category as any)?.name ?? "",
      colorImage: typedProduct.colors[item.selectedColor].images[0],
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedColorHex: typedProduct.colors[item.selectedColor].hex,
      discountPercentage: item.discountPercentage,
      price: item.price
    };
  });

  return {
    _id: cart._id,
    user: cart.user,
    delivery: cart.delivery,
    total: cart.total,
    items: itemsWithImages
  };
};