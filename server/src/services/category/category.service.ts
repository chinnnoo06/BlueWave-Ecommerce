
import path from "path"
import fs from "fs";
import colors from "colors";

import { TCategory } from "../../types/category/category.types"
import { TMongoId, TMongoIdParams } from "../../types/mongo/mongo.tpyes";

import { HttpError } from "../../helpers";
import { categoryRepository } from "../../repositories/category/category.repository"

export const getCategoriesService = async () => {
  const categories = await categoryRepository.getCategories()

  if (categories.length === 0) throw new HttpError(404, "No hay categorías");

  return categories
}

export const addCategoryService = async (data: TCategory, file: Express.Multer.File) => {
  const image = file.filename;
  const ext = path.extname(image).toLowerCase();

  if (ext !== '.webp') {
    throw new HttpError(400, "Extensión inválida. Solo se permiten archivos .webp");
  }

  // Verificar que el archivo convertido exista en disco
  if (!fs.existsSync(file.path)) {
    throw new HttpError(500, "El archivo convertido no se generó correctamente");
  }

  const objCategory: TCategory = {
    ...data,
    image
  };

  const category = await categoryRepository.addCategory(objCategory)

  return category
}

export const removeCategoryService = async (categoryId: TMongoIdParams['id']) => {
  const category = await categoryRepository.findById(categoryId)

  if (!category) throw new HttpError(404, "No existe la categoría");

  if (category.image) {
    const filePath = path.join(__dirname, "../../uploads/categories", category.image)

    try {
      await fs.promises.unlink(filePath);
      console.log(`Imagen eliminada: ${category.image}`);
    } catch (err) {
      console.error(`Error eliminando ${category.image}: ${err}`);
      throw new HttpError(500, `Error eliminando ${category.image}: ${err}`);
    }
  }

  await categoryRepository.deleteOne(category)
}

export const updateCategoryService = async (categoryId: TMongoIdParams['id'], data: TCategory, file?: Express.Multer.File) => {
  const category = await categoryRepository.findById(categoryId);
  if (!category) throw new Error('No existe la categoria');

  const sanitized = data.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();

  let newImage = category.image;
  const uploadDir = path.join(__dirname, "../../uploads/categories");

  if (file) { // si hay imagen nueva
    if (data.name !== category.name && category.image) {
      const filePath = path.join(uploadDir, category.image);

      try {
        await fs.promises.unlink(filePath);
        console.log(colors.green(`Imagen eliminada: ${category.image}`));
      } catch (err: any) {
        throw new HttpError(500, `No se pudo eliminar la imagen anterior: ${err.message}`);
      }
    }

    newImage = file.filename;

  } else { // sin imagen nueva
    if (data.name !== category.name && category.image) {
      const oldPath = path.join(uploadDir, category.image);
      const newPath = path.join(uploadDir, `category-${sanitized}.webp`);


      try {
        await fs.promises.access(oldPath); // verificar que existe
        await fs.promises.rename(oldPath, newPath);
        console.log(colors.green(`Imagen renombrada: ${oldPath} → ${newPath}`));
      } catch (err: any) {
        throw new HttpError(500, `No se pudo renombrar la imagen: ${err.message}`);
      }

      newImage = `category-${sanitized}.webp`;
    }
  }

  category.slug = data.slug
  category.name = data.name
  category.description = data.description,
  category.image = newImage

  await categoryRepository.save(category)
  
  return category;
}

export const validateCategoryBySlugService = async (slug: TCategory['slug']) => {
  return await categoryRepository.findBySlug(slug)
}

export const validateCategoryByIdService = async (categoryId: TMongoId['_id']) => {
  return await categoryRepository.findById(categoryId)
}