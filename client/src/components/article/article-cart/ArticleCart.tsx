import { GlobalImageArticle } from "../../../helpers/config/env"
import { ArticleCardInfo } from "./ArticleCardInfo"
import type { TArticleCartProps } from "./types"

export const ArticleCart = ({article} : TArticleCartProps) => {
    return (
        <div className="group flex flex-col gap-2 cursor-pointer">
            <div className="overflow-hidden rounded-4xl">
                <img
                    src={`${GlobalImageArticle.url}${article.coverImage}`}
                    alt={article.title}
                    className=" w-full h-full object-cover transition-transform duration-300 group-hover:hover:scale-[1.03] "
                />
            </div>
            <ArticleCardInfo article={article}/>
        </div>
    )
}
