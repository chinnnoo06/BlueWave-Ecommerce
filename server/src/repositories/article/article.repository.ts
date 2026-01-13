import { PipelineStage } from "mongoose"
import { Article } from "../../models/Article"
import { TArticle } from "../../types/article/article.types"

export const articleRepository = {

    async addArticle(data: TArticle) {
        return Article.create(data)
    },

    async getArticles() {
        return Article.find()
    },

    async getInitialsArticles(pipeline: PipelineStage[]) {
        return Article.aggregate(pipeline)
    },

    async getOneArticle(slug: TArticle['slug']) {
        return Article.findOne({ slug })
    },


}
