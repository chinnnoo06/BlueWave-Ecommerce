import { Request, Response } from "express";
import colors from 'colors'
import path from "path";
import fs from "fs";

import { Category } from "../models/Category";

import { validateCategoryExist } from "../services/category/category.service";

import { TCategory } from "../types/category/category.types";
import { TCategoryIdParams } from "../types/params/params.types";

export const getCategories = async (req: Request, res: Response) => {

    try {
        const categories = await Category.find()

        if(categories.length === 0){
            throw new Error ('No hay categorías')
        }

        return res.status(200).json({
            status: "success",
            categories
        });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener categorias"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const addCategory = async (req: Request<{}, {}, TCategory>, res: Response) => {
    let params = req.body

    try {
        if (!req.file) {
            throw new Error('La petición no tiene imagen')
        }

        const image = req.file.filename;
        const ext = path.extname(image).toLowerCase();


        if (ext !== '.webp') {
            throw new Error('Extensión invalida')
        }

        // Verificar que el archivo convertido exista en disco
        if (!fs.existsSync(req.file.path)) {
            throw new Error('Archivo convertido no encontrado');
        }

        const objCategory: TCategory = {
            slug: params.slug,
            name: params.name,
            description: params.description,
            image: req.file.filename
        }

        const newCategory = new Category(objCategory)
        const createCategory = await newCategory.save()

        return res.status(200).json({
            status: "success",
            mensaje: "Categoria agregada con exito",
            createCategory
        });
    } catch (error) {
        console.log(colors.red.bold("Error al agregar categoria"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }

}

export const removeCategory = async (req: Request<TCategoryIdParams, {}, {}>, res: Response) => {
    let id = req.params.id

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            throw new Error('No se existe la categoria')
        }

        if (category.image) {
            const filePath = path.join(__dirname, "../uploads/categories", category.image)

            try {
                await fs.promises.unlink(filePath);
                console.log(`Imagen eliminada: ${category.image}`);
            } catch (err) {
                console.error(`Error eliminando ${category.image}: ${err}`);
            }
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Categoria eliminada con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar categoria"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const updateCategory = async (req: Request<TCategoryIdParams, {}, TCategory>, res: Response) => {
    let params = req.body
    let urlParams = req.params

    const sanitized = params.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();

    try {
        const categoryExist = await validateCategoryExist(urlParams.id)

        if (!categoryExist) {
            throw new Error('No existe la categoria')
        }

        let newImage = categoryExist.image;

        if (req.file) { // si hay imagen
            if (params.name !== categoryExist.name) { // y nombre cambio, solo eliminar la imagen con el nombre anterior (porque ya se agrega la nueva con el nuevo nombre)
                const filePath = path.join(__dirname, "../uploads/categories", categoryExist.image)
                fs.unlink(filePath, (err) => {
                    if (err) {
                        throw new Error(`Error eliminando ${categoryExist.image}:  ${err.message}`)
                    } else {
                        console.log(`Imagen eliminada: ${categoryExist.image}`);
                    }
                });
            }

            newImage = req.file.filename;

            // y nombre no cambio, mantener asi (porque se vuelve a agregar una con el nombre viejo y la reemplaza)
        } else {
            if (params.name !== categoryExist.name) { // y el nombre cambio, renombrar la imagen existente con el nuevo nombre
                const oldPath = path.join(__dirname, "../uploads/categories", categoryExist.image);
                const newPath = path.join(__dirname, "../uploads/categories", `category-${sanitized}.webp`);

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        throw new Error(`Error renombrando archivo: ${err.message}`);
                    } else {
                        console.log(`Imagen renombrada: ${oldPath} → ${newPath}`);
                    }
                });
            }

            newImage = `category-${sanitized}.webp`;

            // y el nombre no cambio, pues se mantiene igual
        }

        const objCategory : TCategory = {
            slug: params.slug,
            name: params.name,
            description: params.description,
            image: newImage
        }

        const updateCategory = await Category.findByIdAndUpdate(urlParams.id, objCategory, { new: true })

        return res.status(200).json({
            status: "success",
            mensaje: "Categoria actualizada con exito",
            category: updateCategory
        });

    } catch (error) {
        console.log(colors.red.bold("Error al actualizar categoria"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}