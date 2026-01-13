import { useEffect } from "react"
import { ArticleMainArticle } from "../../components/article/ArticleMainArticle"
import { useAppStore } from "../../stores/useAppStore"
import { Spinner } from "../../components/ui/Spinner"
import { ArticleAllArticles } from "../../components/article/ArticleAllArticles"
import { SubscriberCart } from "../../components/subscriber/SubscriberCart"

export const ArticlesPage = () => {
    const { articles, getArticles } = useAppStore()

    useEffect(() => {
        if (!articles.length) {
            getArticles()
        }
    }, [articles.length, getArticles])

    if (!articles.length) {
        return <Spinner />
    }

    return (
        <div id="articles" className="articles-container flex flex-col">

            <div className="article-main-article-container pb-15">
                <ArticleMainArticle />
            </div>

            <div className="article-all-article-container pb-15">
                <ArticleAllArticles />
            </div>

            <div className="subscribe-cart-container py-15 bg-[#e2e4f4]">
                <SubscriberCart />
            </div>

        </div>
    )
}
