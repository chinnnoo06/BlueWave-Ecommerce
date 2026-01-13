import { Link } from 'react-router-dom'
import type { TArticleCartProps } from './types'

export const ArticleCardInfo = ({ article }: TArticleCartProps) => {
  return (
    <>
      <div className="flex gap-5 mt-2 items-center">
        <div className="font-medium text-xs lg:text-sm text-white bg-[#0C71E4] px-3 rounded-lg">{article.category}</div>
        <span className="font-medium text-sm lg:text-base opacity-65">{article.publishedAt}</span>
      </div>

      <div className="flex gap-5 ">
        <h3 className="font-semibold text-xl lg:text-2xl text-[#001F3F] group-hover:text-[#0C71E4] transition-colors duration-300">{article.title}</h3>
      </div>

      <p className="font-medium opacity-65 text-base lg:text-lg">{article.excerpt}</p>

      <Link to={`/articulos/${article.slug}`} className="self-start">
        <span className="font-medium text-[#0C71E4] hover:text-[#0855ae] text-base lg:text-lg flex items-center">Leer Más</span>
      </Link>
    </>
  )
}
