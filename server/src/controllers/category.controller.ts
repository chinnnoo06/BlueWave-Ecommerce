import { NextFunction, Request, Response } from "express";
import colors from 'colors'

import { TCategory } from "../types/category/category.types";
import { addCategoryService, getCategoriesService, removeCategoryService, updateCategoryService } from "../services/category/category.service";
import { TMongoIdParams } from "../types/mongo/mongo.tpyes";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await getCategoriesService()

        return res.status(200).json({
            status: "success",
            categories
        });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener categorias"));
        next(error);
    }
}

export const addCategory = async (req: Request<{}, {}, TCategory>, res: Response, next: NextFunction) => {
    const params = req.body

    try {
        if (!req.file) throw new Error('La petición no tiene imagen')

        const category = await addCategoryService(params, req.file)

        return res.status(200).json({
            status: "success",
            mensaje: "Categoria agregada con exito",
            category
        });

    } catch (error) {
        console.log(colors.red.bold("Error al agregar categoria"));
        next(error);
    }

}

export const removeCategory = async (req: Request<TMongoIdParams, {}, {}>, res: Response, next: NextFunction) => {
    const id = req.params.id

    try {
        await removeCategoryService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Categoria eliminada con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar categoria"));
        next(error);
    }
}

export const updateCategory = async (req: Request<TMongoIdParams, {}, TCategory>, res: Response, next: NextFunction) => {
    const params = req.body
    const urlParams = req.params

    try {
        const updateCategory = await updateCategoryService(urlParams.id, params, req.file)

        return res.status(200).json({
            status: "success",
            mensaje: "Categoria actualizada con exito",
            category: updateCategory
        });

    } catch (error) {
        console.log(colors.red.bold("Error al actualizar categoria"));
        next(error);
    }
}