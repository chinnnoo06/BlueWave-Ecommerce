import { motion } from "framer-motion"
import { useAppStore } from "../../stores/useAppStore"
import { ArticleCardInfo } from "./article-cart/ArticleCardInfo"
import { slideInBottom, slideInLeft, slideInRight } from "../../helpers/animations/motion"
import { GlobalImageArticle } from "../../helpers/config/env"

export const ArticleMainArticle = () => {
    const { articles } = useAppStore()

    const article = articles[0]

    return (
        <div className='max-w-[1300px] px-4 mx-auto'>
            <motion.div {...slideInBottom} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">
                    BlueWave Blog
                </h2>
            </motion.div>

            <div className="relative flex flex-col lg:flex lg:items-center lg:flex-row group">
                <motion.div {...slideInLeft()} className="w-full lg:w-1/2">
                    <div className="aspect-video w-full overflow-hidden rounded-4xl min-h-[420px] max-h-[600px] lg:max-h-none">
                        <img
                            src={`${GlobalImageArticle.url}${article.coverImage}`}
                            alt="Producto"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:hover:scale-[1.03]"
                        />
                    </div>
                </motion.div>

                <motion.div {...slideInRight()}
                    className="                     
                        bg-white
                        rounded-4xl
                        shadow-lg
                        p-8
                        z-10
                        relative

                        /* 📱 < sm: normal, debajo de la imagen */
                        w-full
                        mt-5

                        /* 📱 sm–md: sobrepuesta, centrada y más angosta */
                        sm:-mt-24
                        md:-mt-28
                        sm:mx-auto
                        sm:w-[80%]
                        md:w-[70%]
                        
                        /* 💻 lg+: comportamiento actual */
                        lg:mt-0
                        lg:absolute
                        lg:right-1
                        lg:top-1/2
                        lg:-translate-y-1/2
                        lg:w-[55%]
                    "
                >

                    <ArticleCardInfo article={article}/>
                </motion.div>
            </div>

        </div>
    )
}
