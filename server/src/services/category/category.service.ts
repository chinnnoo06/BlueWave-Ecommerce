import { Category } from "../../models/Category"
import { TCategoryId } from "../../types/category/category.types"

export const validateCategoryExist = async (id: TCategoryId | string) => {
  return await Category.findById(id)
}