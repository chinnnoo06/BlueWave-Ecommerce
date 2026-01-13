import { Product } from "../../models/Product"
import { TProductId } from "../../types/product/product.types"

export const validateProductExist = async (id: TProductId) => {
  return await Product.findById(id)
}
