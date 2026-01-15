import path from "path"
import fs from "fs";

import { HttpError, shuffleWithSeed } from "../../helpers"
import { productRepository } from "../../repositories/product/product.repository"
import { TGetProducts, TProductIdParams, TSearchProducts } from "../../types/params/params.types"
import { TColor, TProduct, TProductId, TPromotion } from "../../types/product/product.types"
import { TUserId } from "../../types/user/user.types"
import { validateCategoryByIdService, validateCategoryBySlugService } from "../category/category.service"
import { getUserSearchesService, updateUserSearchesService } from "../user/user.service"
import slugify from "slugify";

export const getProductsService = async (data: TGetProducts) => {
  const itemsPerPage = 9;

  let filter: any = {}

  if (data.category !== "all") {
    const categoryDoc = await validateCategoryBySlugService(data.category)

    if (!categoryDoc) throw new HttpError(404, "No existe la categoría");

    filter.category = categoryDoc._id;
  }

  const allProducts = await productRepository.getProducts(filter)

  // 🔹 Seed basado en la hora actual (hora Unix / 3600)
  const seed = Math.floor(Date.now() / (1000 * 60 * 60));

  const shuffled = shuffleWithSeed(allProducts, seed);

  const startIndex = (Number(data.page) - 1) * itemsPerPage;
  const paginated = shuffled.slice(startIndex, startIndex + itemsPerPage);

  // 👇 Convertimos category → string
  const productsFormatted = paginated.map(product => ({
    ...product,
    category: (product.category as any)?.name ?? "Sin categoría"
  }))

  return {
    products: productsFormatted,
    total: allProducts.length,
    page: Number(data.page),
    itemsPerPage,
    pages: Math.ceil(allProducts.length / itemsPerPage)
  }
}

export const getCarouselProductsService = async () => {
  const products = await productRepository.getCarouselProducts()

  return products
}

export const getOneProductService = async (slugId: string) => {
  const id = slugId?.split("--").pop()

  const product = await productRepository.getOneProduct(id)

  if (!product) throw new HttpError(404, "No existe el producto");

  const productFormated = { ...product, category: (product.category as any)?.name ?? "Sin categoría" }

  return productFormated
}

export const getSearchService = async (data: TSearchProducts, userId: TUserId['_id']) => {
  const search = data.search || "";
  let page = parseInt(data.page);
  if (isNaN(page) || page < 1) page = 1;
  const itemsPerPage = 9;

  const words = search.split(/\s+/);

  const regex = new RegExp(
    words.map(w => `(?=.*${w})`).join(""),
    "i"
  );

  let allProducts = await productRepository.getProductsSearch(regex)

  if (search) {
    allProducts = allProducts.sort((a, b) => {
      const aExact =
        a.name.toLowerCase() === search.toLowerCase()
      const bExact =
        b.name.toLowerCase() === search.toLowerCase()

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });
  }


  // Paginamos manualmente
  const totalDocs = allProducts.length;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const docs = allProducts.slice(start, end);

  const productsFormatted = docs.map(product => ({
    ...product,
    category: (product.category as any)?.name ?? "Sin categoría"
  }));

  if (userId) {
    await getUserSearchesService(userId, search)

    const userUpdated = await updateUserSearchesService(userId, search)

    return {
      products: productsFormatted,
      total: totalDocs,
      page,
      itemsPerPage,
      pages: Math.ceil(totalDocs / itemsPerPage),
      userSearches: userUpdated.searches
    }
  }

  return {
    products: productsFormatted,
    total: totalDocs,
    page,
    itemsPerPage,
    pages: Math.ceil(totalDocs / itemsPerPage)
  }

}

export const addProductService = async (data: TProduct, files: Express.Multer.File[]) => {

  let colorsP: TColor[] = [];

  // colores nuevos
  if (typeof data.colors === "string") {
    colorsP = JSON.parse(data.colors) as TColor[];
  }

  let numColors = colorsP.length

  const categoryExist = await validateCategoryByIdService(data.category)

  if (!categoryExist) {
    for (const file of files) {
      const filePath = path.join(__dirname, "../../uploads/products", file.filename);

      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error(`Error eliminando ${file.filename}: ${err}`);
        throw new HttpError(500, `Error eliminando ${file.filename}: ${err}`);
      }
    }

    throw new HttpError(404, "No existe la categoría");
  }

  const baseSlug = slugify(data.name, { lower: true, strict: true })
  const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`

  const objProduct: TProduct = {
    name: data.name,
    slug: slug,
    description: data.description,
    category: data.category,
    price: data.price,
    colors: []
  }

  for (let i = 0; i < numColors; i++) {

    const fieldname = `colorImages[${i}]`;

    const filesForColor = files.filter(file => file.fieldname === fieldname);

    const images = filesForColor.map(file => file.filename);

    objProduct.colors.push({
      color: colorsP[i].color,
      hex: colorsP[i].hex,
      images: images
    });
  }

  const createdProduct = await productRepository.addProduct(objProduct)

  return createdProduct
}

export const updateProductService = async (productId: TProductIdParams['id'], data: TProduct, files: Express.Multer.File[]) => {

  let newColors: TColor[] = [];
  let oldColors: TColor[] = [];

  // colores nuevos
  if (typeof data.colors === "string") {
    newColors = JSON.parse(data.colors) as TColor[];
  }

  let numNewColors = newColors.length

  const categoryExist = await validateCategoryByIdService(data.category)
  const productExist = await productRepository.findById(productId)

  if (!categoryExist || !productExist) {
    for (const file of files) {
      const filePath = path.join(__dirname, "../../uploads/products", file.filename);

      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error(`Error eliminando ${file.filename}: ${err}`);
        throw new HttpError(500, `Error eliminando ${file.filename}: ${err}`);
      }
    }

    if (!categoryExist) throw new HttpError(404, "No existe la categoría");
    if (!productExist) throw new HttpError(404, "No existe el producto");
  }

  let slug = productExist.slug

  if (data.name !== productExist.name) {
    const baseSlug = slugify(data.name, { lower: true, strict: true })
    slug = `${baseSlug}-${Date.now().toString().slice(-5)}`
  }

  const objProduct: TProduct = {
    name: data.name,
    slug: slug,
    description: data.description,
    category: data.category,
    price: data.price,
    colors: []
  }

  for (let i = 0; i < numNewColors; i++) {

    const fieldname = `colorImages[${i}]`;

    const filesForColor = files.filter(file => file.fieldname === fieldname);

    const images = filesForColor.map(file => file.filename);

    objProduct.colors.push({
      color: newColors[i].color,
      hex: newColors[i].hex,
      images: images
    });
  }

  const updatedProduct = await productRepository.updatedProduct(productId, objProduct)

  // Eliminar imagenes anteriores
  oldColors = productExist.colors
  let numOldColors = oldColors.length

  for (let i = 0; i < numOldColors; i++) {
    for (let j = 0; j < oldColors[i].images.length; j++) {
      const filePath = path.join(__dirname, "../../uploads/products", oldColors[i].images[j]);

      try {
        fs.unlinkSync(filePath);
        console.log(`Imagen eliminada: ${oldColors[i].images[j]}`);
      } catch (err: any) {
        console.error(`Error eliminando ${oldColors[i].images[j]}: ${err.message}`);
        throw new HttpError(500, `Error eliminando ${oldColors[i].images[j]}: ${err.message}`);
      }
    }
  }

  return updatedProduct
}


export const removeProductService = async (productId: TProductIdParams['id']) => {
  let colorsP: TColor[] = [];

  const productExist = await productRepository.removeProduct(productId)

  if (!productExist) throw new HttpError(404, "No existe el producto");

  colorsP = productExist.colors

  let numColors = colorsP.length

  for (let i = 0; i < numColors; i++) {

    for (let j = 0; j < colorsP[i].images.length; j++) {

      const filePath = path.join(__dirname, "../../uploads/products", colorsP[i].images[j]);

      try {
        fs.unlinkSync(filePath);
        console.log(`Imagen eliminada: ${colorsP[i].images[j]}`);
      } catch (err: any) {
        console.error(`Error eliminando ${colorsP[i].images[j]}: ${err.message}`);
        throw new HttpError(500, `Error eliminando ${colorsP[i].images[j]}: ${err.message}`);
      }

    }
  }
}

export const addPromotionService = async (productId: TProductIdParams['id'], data: TPromotion) => {
  const product = await productRepository.addPromotion(productId, data)

  if (!product) throw new HttpError(404, "No existe el producto");

  return product
}

export const removePromotionService = async (productId: TProductIdParams['id']) => {
  const product = await productRepository.removePromotion(productId)

  if (!product) throw new HttpError(404, "No existe el producto");

  return product
}

export const getProductInLsCartService = async (productId: TProductId['_id']) => {
  return await  productRepository.getProductInLsCart(productId)
}

export const validateProductByIdService = async (productId: TProductId['_id']) => {
  return await productRepository.findById(productId)
}