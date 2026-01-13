import { Request, Response } from "express"
import colors from 'colors'

import { TArticle } from "../types/article/article.types";
import { addArticleService, getArticlesService, getInitialsArticlesService, getOneArticleService } from "../services/article/article.service";

export const addArticle = async (req: Request<{}, {}, TArticle>, res: Response) => {
    const params = req.body;
    try {
        const article = await addArticleService(params)

        return res.status(200).json({
            status: "success",
            mensaje: "Artículo registrado con exito",
            article,
        });
    } catch (error) {
        console.log(colors.red.bold("Error al registrar artículo"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const getArticles = async (req: Request, res: Response) => {
    try {
        const articles = await getArticlesService()

        return res.status(200).json({
            status: "success",
            articles
        });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener artículos"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

type TGetInitialArticlesParams = {
    excluded?: string
}

export const getInitialsArticles = async (req: Request<TGetInitialArticlesParams, {}, {}>, res: Response) => {
    const { excluded } = req.params

    try {
        const articles = await getInitialsArticlesService(excluded)

        return res.status(200).json({
            status: "success",
            articles
        })
    } catch (error) {
        console.log(colors.red.bold("Error al obtener artículos"))
        return res.status(400).json({
            status: "error",
            mensaje:
                error instanceof Error ? error.message : "Error desconocido"
        })
    }
}

type TGetOneArticleParams = {
    slug: TArticle['slug']
}

export const getOneArticle = async (req: Request<TGetOneArticleParams, {}, {}>, res: Response) => {
    const { slug } = req.params

    try {
        const article = await getOneArticleService(slug)

        return res.status(200).json({
            status: "success",
            article
        })
    } catch (error) {
        console.log(colors.red.bold("Error al obtener artículo"))
        return res.status(400).json({
            status: "error",
            mensaje:
                error instanceof Error ? error.message : "Error desconocido"
        })
    }
}