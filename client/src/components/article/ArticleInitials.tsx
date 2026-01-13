import { motion } from "framer-motion"
import { slideInBottomInView, slideInLeftInView, slideInRightInView } from "../../helpers/animations/motion"
import { useAppStore } from "../../stores/useAppStore"

import { Link } from "react-router-dom"
import { ArticleCart } from "../article/article-cart/ArticleCart"
import { useEffect } from "react"
import { Spinner } from "../ui/Spinner"

type TArticleInitialsProps = {
    articleExcluded?: string
}

export const ArticleInitials = ({ articleExcluded }: TArticleInitialsProps) => {
    const { articlesInitials, getArticlesInitials } = useAppStore()

    useEffect(() => {
        getArticlesInitials(articleExcluded)
    }, [articleExcluded, getArticlesInitials])


    if (!articlesInitials.length) {
        return <Spinner />
    }

    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <div className="flex justify-between items-center mb-6">
                <motion.div {...slideInLeftInView()}>
                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">BlueWave Blog</h2>
                </motion.div>

                <motion.div {...slideInRightInView()} className="hidden sm:block">

                    <Link to='/articulos'>
                        <button className="bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm lg:text-base">
                            Ver todos los Artículos
                        </button>
                    </Link>


                </motion.div>
            </div>

            <motion.div {...slideInBottomInView} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {articlesInitials.map((article, index) => (
                    <ArticleCart article={article} key={index} />
                ))}

            </motion.div>

            <motion.div {...slideInBottomInView} className="flex justify-center sm:hidden mt-10">

                <Link to='/articulos'>
                    <button className="bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-base">
                        Ver todos los Artículos
                    </button>

                </Link>

            </motion.div>

        </div>
    )
}
