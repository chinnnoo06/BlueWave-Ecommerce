import { motion } from "framer-motion"
import { useAppStore } from "../../stores/useAppStore"
import { ArticleCart } from "./article-cart/ArticleCart"
import { useState } from "react"
import { ArticleCategoryButton } from "./article-cart/ArticleCategoryButton"
import { slideInItemInView, slideInLeftInView, slideInRightInView } from "../../helpers/animations/motion"

export const ArticleAllArticles = () => {
    const { articles } = useAppStore()
    
    const [articleCategory, setArticleCategory] = useState("Todos")

    const filteredArticles =
        articleCategory === "Todos"
            ? articles
            : articles.filter(article => article.category === articleCategory)


    const handleArticleCategory = (newArticleCategory: string) => {
        setArticleCategory(newArticleCategory)
    }

    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
                <motion.div {...slideInLeftInView()}>
                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">
                        {articleCategory === "Todos" && 'Todos los Artículos'}
                        {articleCategory === "Guía" && 'Artículos de Guía'}
                        {articleCategory === "Noticias" && 'Artículos de Noticias'}
                        {articleCategory === "Tech" && 'Artículos de Tech'}
                    </h2>
                </motion.div>

                <motion.div {...slideInRightInView()} className="flex flex-wrap gap-3 md:gap-5">
                    <ArticleCategoryButton articleCategory={articleCategory} newArticleCategory="Todos" handleArticleCategory={handleArticleCategory} />
                    <ArticleCategoryButton articleCategory={articleCategory} newArticleCategory="Guía" handleArticleCategory={handleArticleCategory} />
                    <ArticleCategoryButton articleCategory={articleCategory} newArticleCategory="Noticias" handleArticleCategory={handleArticleCategory} />
                    <ArticleCategoryButton articleCategory={articleCategory} newArticleCategory="Tech" handleArticleCategory={handleArticleCategory} />
                </motion.div>
            </div>

            <motion.div {...slideInItemInView} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {articleCategory === "Todos" ? (
                    <>
                        {filteredArticles.slice(1).map((article, index) => (
                            <ArticleCart article={article} key={index} />
                        ))}
                    </>
                ) : (
                    <>
                        {filteredArticles.map((article, index) => (
                            <ArticleCart article={article} key={index} />
                        ))}
                    </>
                )}

            </motion.div>

        </div>
    )
}
