import { Request, Response } from "express"
import colors from 'colors'
import path from "path";
import fs from "fs";
import slugify from "slugify";

import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { User } from "../models/User";

import { TColor, TProduct, TPromotion } from "../types/product/product.types"
import { TCategoryIdParams, TProductIdParams } from "../types/params/params.types";

import { shuffleWithSeed } from "../helpers";

import { validateCategoryExist } from "../services/category/category.service";

type TGetProducts = {
    category: TCategoryIdParams['id'],
    page: string
}

export const getProducts = async (req: Request<TGetProducts, {}, {}>, res: Response) => {
    let category = req.params.category
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;
    const itemsPerPage = 9;

    try {
        let filter: any = {}

        if (category !== "all") {
            const categoryDoc = await Category.findOne({
                slug: category
            });

            if (!categoryDoc) {
                return res.status(404).json({
                    status: "error",
                    message: "Categoría no encontrada"
                });
            }

            filter.category = categoryDoc._id;
        }

        const allProducts = await Product.find(filter)
            .populate("category", "name")
            .lean()

        // 🔹 Seed basado en la hora actual (hora Unix / 3600)
        const seed = Math.floor(Date.now() / (1000 * 60 * 60));

        const shuffled = shuffleWithSeed(allProducts, seed);

        const startIndex = (page - 1) * itemsPerPage;
        const paginated = shuffled.slice(startIndex, startIndex + itemsPerPage);

        // 👇 Convertimos category → string
        const productsFormatted = paginated.map(product => ({
            ...product,
            category: (product.category as any)?.name ?? "Sin categoría"
        }))

        return res.status(200).send({
            status: "success",
            products: productsFormatted,
            total: allProducts.length,
            page,
            itemsPerPage,
            pages: Math.ceil(allProducts.length / itemsPerPage)
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const getCarouselProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 8 } },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }

            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    category: "$category.name" // SOLO el nombre
                }
            }
        ]);

        return res.status(200).send({
            status: "success",
            products
        })

    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos del carousel"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

type TGetOneProductParams = {
    slugId: string
}

export const getOneProduct = async (req: Request<TGetOneProductParams, {}, {}>, res: Response) => {
    let slugId = req.params.slugId

    const id = slugId?.split("--").pop()

    try {
        const product = await Product.findById(id)
            .populate("category", "name")
            .lean()

        if (!product) {
            throw new Error('No existe el producto')
        }

        const productFormated = { ...product, category: (product.category as any)?.name ?? "Sin categoría" }

        return res.status(200).send({
            status: "success",
            product: productFormated
        })

    } catch (error) {
        console.log(colors.red.bold("Error al obtener producto"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

type TSearchProducts = {
    search: string,
    page: string
}

export const getSearch = async (req: Request<TSearchProducts, {}, {}>, res: Response) => {
    const id = req.user?._id ?? null;

    const search = req.params.search || "";
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;
    const itemsPerPage = 9;

    try {
        const words = search.split(/\s+/);

        const regex = new RegExp(
            words.map(w => `(?=.*${w})`).join(""),
            "i"
        );

        let allProducts = await Product.find({ name: { $regex: regex } })
            .populate("category", "name")
            .lean();

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

        if (id) {
            await User.findByIdAndUpdate(id, {
                $pull: { searches: search }
            });

            const userUpdated = await User.findByIdAndUpdate(id, {
                $push: {
                    searches: {
                        $each: [search],
                        $slice: -5
                    }
                }
            }, { new: true });

            return res.status(200).json({
                status: "success",
                products: productsFormatted,
                total: totalDocs,
                page,
                itemsPerPage,
                pages: Math.ceil(totalDocs / itemsPerPage),
                userSearches: userUpdated.searches
            });
        }

        return res.status(200).json({
            status: "success",
            products: productsFormatted,
            total: totalDocs,
            page,
            itemsPerPage,
            pages: Math.ceil(totalDocs / itemsPerPage)
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos de la busqueda"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}


export const addProduct = async (req: Request<{}, {}, TProduct>, res: Response) => {
    let params = req.body

    let colorsP: TColor[] = [];

    try {

        // colores nuevos
        if (typeof params.colors === "string") {
            colorsP = JSON.parse(params.colors) as TColor[];
        }

        let numColors = colorsP.length
        const files = req.files as Express.Multer.File[];

        const categoryExist = await validateCategoryExist(params.category)

        if (!categoryExist) {
            const files = req.files as Express.Multer.File[];

            for (const file of files) {
                const filePath = path.join(__dirname, "../uploads/products", file.filename);

                try {
                    fs.unlinkSync(filePath);
                    console.log("Imagen eliminada:", file.filename);
                } catch { }
            }

            throw new Error('No existe la categoria');
        }

        const baseSlug = slugify(params.name, { lower: true, strict: true })
        const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`

        const objProduct: TProduct = {
            name: params.name,
            slug: slug,
            description: params.description,
            category: params.category,
            price: params.price,
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

        const newProduct = new Product(objProduct)
        const createProduct = await newProduct.save()

        return res.status(200).json({
            status: "success",
            mensaje: "Producto agregado con exito",
            createProduct
        });

    } catch (error) {
        console.log(colors.red.bold("Error al agregar producto"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const updateProduct = async (req: Request<TProductIdParams, {}, TProduct>, res: Response) => {
    let id = req.params.id
    let params = req.body

    let newColors: TColor[] = [];
    let oldColors: TColor[] = [];

    try {

        // colores nuevos
        if (typeof params.colors === "string") {
            newColors = JSON.parse(params.colors) as TColor[];
        }

        let numNewColors = newColors.length
        const files = req.files as Express.Multer.File[];

        const categoryExist = await validateCategoryExist(params.category)
        const productExist = await Product.findById(id)

        if (!categoryExist || !productExist) {
            const files = req.files as Express.Multer.File[];

            for (const file of files) {
                const filePath = path.join(__dirname, "../uploads/products", file.filename);

                try {
                    fs.unlinkSync(filePath);
                    console.log("Imagen eliminada:", file.filename);
                } catch { }
            }

            if (!categoryExist) throw new Error('No existe la categoria');
            if (!productExist) throw new Error('No existe el producto');
        }
        let slug = productExist.slug

        if (params.name !== productExist.name) {
            const baseSlug = slugify(params.name, { lower: true, strict: true })
            slug = `${baseSlug}-${Date.now().toString().slice(-5)}`
        }

        const objProduct: TProduct = {
            name: params.name,
            slug: slug,
            description: params.description,
            category: params.category,
            price: params.price,
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

        const updateProduct = await Product.findByIdAndUpdate(id, objProduct);

        // Eliminar imagenes anteriores
        oldColors = productExist.colors
        let numOldColors = oldColors.length

        for (let i = 0; i < numOldColors; i++) {
            for (let j = 0; j < oldColors[i].images.length; j++) {
                const filePath = path.join(__dirname, "../uploads/products", oldColors[i].images[j]);

                try {
                    fs.unlinkSync(filePath);
                    console.log(`Imagen eliminada: ${oldColors[i].images[j]}`);
                } catch (err: any) {
                    console.error(`Error eliminando ${oldColors[i].images[j]}: ${err.message}`);
                }
            }
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Producto actualizado con exito",
            updateProduct
        });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar producto"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const removeProduct = async (req: Request<TProductIdParams, {}, {}>, res: Response) => {
    let id = req.params.id

    let colorsP: TColor[] = [];

    try {
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            throw new Error('No existe el producto')
        }

        colorsP = product.colors

        let numColors = colorsP.length

        for (let i = 0; i < numColors; i++) {

            for (let j = 0; j < colorsP[i].images.length; j++) {

                const filePath = path.join(__dirname, "../uploads/products", colorsP[i].images[j]);

                try {
                    fs.unlinkSync(filePath);
                    console.log(`Imagen eliminada: ${colorsP[i].images[j]}`);
                } catch (err: any) {
                    console.error(`Error eliminando ${colorsP[i].images[j]}: ${err.message}`);
                }

            }
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Producto eliminado con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar producto"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const addPromotion = async (req: Request<TProductIdParams, {}, TPromotion>, res: Response) => {

    let params = req.body
    let id = req.params.id

    try {
        const product = await Product.findByIdAndUpdate(id, { promotion: params }, { new: true })

        if (!product) {
            throw new Error('No existe el producto')
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Promoción actualizada correctamente",
            product
        });
    } catch (error) {
        console.log(colors.red.bold("Error al agregar promoción"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const removePromotion = async (req: Request<TProductIdParams, {}, {}>, res: Response) => {

    let id = req.params.id

    try {
        const product = await Product.findByIdAndUpdate(id, {
            promotion: {
                active: false,
                discountPercentage: 0
            }
        }, { new: true })

        if (!product) {
            throw new Error('No existe el producto')
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Promoción eliminada correctamente",
            product
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar promoción"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

