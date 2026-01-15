import { NextFunction, Request, Response } from "express"
import colors from 'colors'

import { TGetProducts, TSearchProducts } from "../types/params/params.types";
import { TMongoIdParams } from "../types/mongo/mongo.tpyes";
import { TProduct, TPromotion } from "../types/product/product.types";

import { addProductService, addPromotionService, getCarouselProductsService, getOneProductService, getProductsService, getSearchService, removeProductService, removePromotionService, updateProductService } from "../services/product/product.service";

export const getProducts = async (req: Request<TGetProducts, {}, {}>, res: Response, next: NextFunction) => {
    const params = req.params

    try {
        const result = await getProductsService(params)

        return res.status(200).json({
            status: "success",
            products: result.products,
            total: result.total,
            page: result.page,
            itemsPerPage: result.itemsPerPage,
            pages: result.pages
        });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos"));
        next(error);
    }
}

export const getCarouselProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getCarouselProductsService()

        return res.status(200).send({
            status: "success",
            products
        })

    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos del carousel"));
        next(error);
    }
}

type TGetOneProductParams = {
    slugId: string
}

export const getOneProduct = async (req: Request<TGetOneProductParams, {}, {}>, res: Response, next: NextFunction) => {
    const slugId = req.params.slugId

    try {
        const productFormated = await getOneProductService(slugId)

        return res.status(200).send({
            status: "success",
            product: productFormated
        })

    } catch (error) {
        console.log(colors.red.bold("Error al obtener producto"));
        next(error);
    }
}

export const getSearch = async (req: Request<TSearchProducts, {}, {}>, res: Response, next: NextFunction) => {
    const id = req.user?._id ?? null;
    const params = req.params

    try {
        const result = await getSearchService(params, id)

        if (id) {
            return res.status(200).json({
                status: "success",
                products: result.products,
                total: result.total,
                page: result.page,
                itemsPerPage: result.itemsPerPage,
                pages: result.pages,
                userSearches: result.userSearches
            });
        }

        return res.status(200).json({
            status: "success",
            products: result.products,
            total: result.total,
            page: result.page,
            itemsPerPage: result.itemsPerPage,
            pages: result.pages
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos de la busqueda"));
        next(error);
    }
}


export const addProduct = async (req: Request<{}, {}, TProduct>, res: Response, next: NextFunction) => {
    let params = req.body

    const files = req.files as Express.Multer.File[];

    try {
        const createdProduct = await addProductService(params, files)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto agregado con exito",
            createdProduct
        });
    } catch (error) {
        console.log(colors.red.bold("Error al agregar producto"));
        next(error);
    }
}

export const updateProduct = async (req: Request<TMongoIdParams, {}, TProduct>, res: Response, next: NextFunction) => {
    const id = req.params.id
    const params = req.body

    const files = req.files as Express.Multer.File[];

    try {
        const updatedProduct = await updateProductService(id, params, files)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto actualizado con exito",
            updatedProduct
        });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar producto"));
        next(error);
    }
}

export const removeProduct = async (req: Request<TMongoIdParams, {}, {}>, res: Response, next: NextFunction) => {
    let id = req.params.id

    try {
        await removeProductService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto eliminado con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar producto"));
        next(error);
    }
}

export const addPromotion = async (req: Request<TMongoIdParams, {}, TPromotion>, res: Response, next: NextFunction) => {
    const params = req.body
    const id = req.params.id

    try {
        const product = await addPromotionService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Promoción actualizada correctamente",
            product
        });
    } catch (error) {
        console.log(colors.red.bold("Error al agregar promoción"));
        next(error);
    }
}

export const removePromotion = async (req: Request<TMongoIdParams, {}, {}>, res: Response, next: NextFunction) => {
    const id = req.params.id

    try {
        const product = await removePromotionService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Promoción eliminada correctamente",
            product
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar promoción"));
        next(error);
    }
}