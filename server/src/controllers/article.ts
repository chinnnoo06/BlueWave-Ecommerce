import { Request, Response } from "express"
import colors from 'colors'
import { Types } from "mongoose";

import { TArticle } from "../types/article/article.types";
import { Article } from "../models/Article";


export const addArticle = async (req: Request<{}, {}, TArticle>, res: Response) => {
    let params = req.body;
    try {

        const newArticle = new Article(params)
        const createArticle = await newArticle.save()

        return res.status(200).json({
            status: "success",
            article: createArticle,
            mensaje: "Artículo registrado con exito"
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

        const articles = await Article.find()

        if (articles.length === 0) {
            throw new Error('No hay artículos')
        }

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

export const getInitialArticles = async (req: Request<TGetInitialArticlesParams, {}, {}>, res: Response) => {
    try {
        const { excluded } = req.params

        const pipeline: any[] = []

        // excluir artículo si viene
        if (excluded && Types.ObjectId.isValid(excluded)) {
            pipeline.push({
                $match: {
                    _id: { $ne: new Types.ObjectId(excluded) }
                }
            })
        }

        // random + límite
        pipeline.push(
            { $sample: { size: 2 } }
        )

        const articles = await Article.aggregate(pipeline)

        if (!articles.length) {
            throw new Error("No hay artículos")
        }

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

export const getOneArticle= async (req: Request<TGetOneArticleParams, {}, {}>, res: Response) => {
    try {
        const {slug } = req.params

        const article = await Article.findOne({slug: slug})

        if (!article) {
            throw new Error("No existe el atículo")
        }

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