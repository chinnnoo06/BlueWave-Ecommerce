import { slideInBottom } from "../../helpers/animations/motion"
import { GlobalImageArticle } from "../../helpers/config/env"
import { useAppStore } from "../../stores/useAppStore"
import { motion } from "framer-motion"

export const ArticleDetails = () => {
    const { articleSelected } = useAppStore()

    if (!articleSelected) return null

    return (
        <div className="max-w-5xl px-4 mx-auto">

            <div className="flex flex-col gap-5">
                <motion.div {...slideInBottom} className="space-y-5">
                    <div className="flex gap-5 mt-2 items-center">
                        <button className=" bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] '}
                            px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm sm:text-base lg:text-lg">
                            {articleSelected.category}
                        </button>
                        <span className="font-medium text-lg lg:text-xl opacity-65">{articleSelected.publishedAt}</span>
                    </div>

                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">
                        {articleSelected.title}
                    </h2>
                </motion.div>

                <motion.div {...slideInBottom} className="space-y-5">
                    <div className="overflow-hidden rounded-4xl">
                        <img
                            src={`${GlobalImageArticle.url}${articleSelected.coverImage}`}
                            alt={articleSelected.title}
                            className=" w-full h-full object-cover transition-transform duration-300 group-hover:hover:scale-[1.03] "
                        />
                    </div>

                    <section className="space-y-5 text-[#1f2937] leading-relaxed">

                        {articleSelected.content.map((block, index) => {
                            switch (block.type) {
                                case "paragraph":
                                    return (
                                        <p
                                            key={index}
                                            className="text-lg leading-8 opacity-90"
                                        >
                                            {block.text}
                                        </p>
                                    )

                                case "heading":
                                    return block.level === 2 ? (
                                        <h2
                                            key={index}
                                            className="text-2xl lg:text-3xl font-semibold text-[#001F3F]"
                                        >
                                            {block.text}
                                        </h2>
                                    ) : (
                                        <h3
                                            key={index}
                                            className="text-xl lg:text-2xl font-semibold text-[#001F3F]"
                                        >
                                            {block.text}
                                        </h3>
                                    )

                                case "list":
                                    return block.ordered ? (
                                        <ol
                                            key={index}
                                            className="list-decimal pl-6 flex flex-col gap-2"
                                        >
                                            {block.items.map((item, i) => (
                                                <li key={i} className="text-lg leading-7">
                                                    {item}
                                                </li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <ul
                                            key={index}
                                            className="list-disc pl-6 flex flex-col gap-2"
                                        >
                                            {block.items.map((item, i) => (
                                                <li key={i} className="text-lg leading-7">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )

                                case "quote":
                                    return (
                                        <blockquote
                                            key={index}
                                            className="border-l-4 border-[#0C71E4] pl-6 italic text-xl text-gray-600"
                                        >
                                            “{block.text}”
                                        </blockquote>
                                    )
                            }
                        })}

                    </section>
                </motion.div>
                
            </div>

        </div>
    )
}
