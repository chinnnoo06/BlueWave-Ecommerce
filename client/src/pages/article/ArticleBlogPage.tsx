import { useEffect } from "react"
import { useAppStore } from "../../stores/useAppStore"
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { ArticleDetails } from "../../components/article/ArticleDetails";
import { SubscriberCart } from "../../components/subscriber/SubscriberCart";
import { ArticleInitials } from "../../components/article/ArticleInitials";

export const ArticleBlogPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { getOneArticle, articleSelected, articles, getArticles } = useAppStore()

  useEffect(() => {
    if (!articles.length) {
      getArticles()
    }
  }, [articles.length, getArticles])

  useEffect(() => {
    if (!slug) return

    getOneArticle(slug)
  }, [slug, getOneArticle])

  if (!articleSelected || !articles.length) {
    return <Spinner />
  }

  return (
    <div id="articleBlogPage" className="article-blog-page-container flex flex-col">

      <div className="article-details-container pb-15">
        <ArticleDetails />
      </div>

      <div className="subscribe-cart-container py-15 bg-[#e2e4f4]">
        <SubscriberCart />
      </div>


      <div className="home-experience-container py-15">
        <ArticleInitials articleExcluded={articleSelected._id} />
      </div>

    </div>
  )
}
