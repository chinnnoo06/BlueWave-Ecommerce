import { Cart } from "../../models/Cart";
import { TProductwithID } from "../../types/product/product.types";


export const buildCartResponse = async (cartId: string) => {
  const cart = await Cart.findById(cartId)
    .populate({
      path: "items.productId",
      populate: {
        path: "category",
        select: "name"
      }
    })
    .lean();

  if (!cart) throw new Error("Cart no encontrado");

  const itemsWithImages = cart.items.map(item => {
    const product = item.productId as unknown;

    if (
      !product ||
      typeof product !== "object" ||
      !("name" in product) ||
      !("colors" in product) ||
      !("category" in product)
    ) {
      throw new Error("Producto no poblado correctamente");
    }

    const typedProduct = product as TProductwithID;

    return {
      productId: typedProduct._id,
      productName: typedProduct.name,
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