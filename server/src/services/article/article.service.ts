import { PipelineStage, Types } from "mongoose";
import { articleRepository } from "../../repositories/article/article.repository";
import { TArticle } from "../../types/article/article.types";
import { HttpError } from "../../helpers";

export const addArticleService = async (data: TArticle) => {
    const article = await articleRepository.addArticle(data)

    return article
}

export const getArticlesService = async () => {
    const articles = await articleRepository.getArticles()

    if (articles.length === 0) throw new HttpError(404, "No hay artículos");

    return articles
}

export const getInitialsArticlesService = async (excluded: string) => {
    const pipeline: PipelineStage[] = [];

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

    const articles = await articleRepository.getInitialsArticles(pipeline)

    if (articles.length === 0) throw new HttpError(404, "No hay artículos");

    return articles
}

export const getOneArticleService = async (slug: TArticle['slug']) => {
    const article = await articleRepository.getOneArticle(slug)

    if (!article) throw new HttpError(404, "El artículo no existe");

    return article
}