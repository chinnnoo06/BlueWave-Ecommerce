import { Link } from 'react-router-dom'
import { useAppStore } from '../../../stores/useAppStore'
import { ChevronRight } from "lucide-react"

type TCatologCategoriesProps = {
    currentCategory: string,
    onClose?: () => void,
    searchQuery: string
}

export const CatalogCategories = ({ currentCategory, onClose, searchQuery }: TCatologCategoriesProps) => {
    const { categories } = useAppStore()

    return (
        <div className="lg:sticky lg:top-5 lg:h-fit">
            <div className=" w-full lg:w-72 ">

                <div className="hidden lg:flex flex-col items-start  pb-5 border-b border-[#001F3F]/10">
                    <h3 className="font-semibold text-xl text-[#001F3F]">
                        Categorías de Productos
                    </h3>
                    <span className="font-medium text-sm opacity-65 ">
                        {searchQuery && `Resultados para "${searchQuery}"`}
                    </span>
                </div>

                <nav className="space-y-2 lg:pt-5">
                    <Link to={'/catalogo/todos/1'} onClick={onClose}
                        className={`flex items-center justify-between group rounded-lg px-3 py-2 lg:px-4 lg:py-3 transition-all duration-200 ${currentCategory === 'todos'
                            ? 'bg-[#0C71E4]/10 text-[#0C71E4] '
                            : 'text-[#001F3F] hover:bg-[#001F3F]/5 hover:text-[#0C71E4]'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors ${currentCategory === 'todos'
                                ? 'bg-[#0C71E4]'
                                : 'bg-[#001F3F]/30 group-hover:bg-[#0C71E4]'
                                }`} />
                            <span className="font-medium text-sm lg:text-base">
                                Todos los productos
                            </span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform ${currentCategory === 'todos'
                            ? 'text-[#0C71E4] rotate-90'
                            : 'text-[#001F3F]/40 group-hover:text-[#0C71E4] group-hover:translate-x-0.5'
                            }`} />
                    </Link>

                    {categories.map(category => (
                        <Link to={`/catalogo/${category.slug}/1`} onClick={onClose}
                            key={category._id}
                            className={`flex items-center justify-between group rounded-lg px-3 py-2 lg:px-4 lg:py-3 transition-all duration-200 ${currentCategory === category.slug
                                ? 'bg-[#0C71E4]/10 text-[#0C71E4]'
                                : 'text-[#001F3F] hover:bg-[#001F3F]/5 hover:text-[#0C71E4]'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors ${currentCategory === category.slug
                                    ? 'bg-[#0C71E4]'
                                    : 'bg-[#001F3F]/30 group-hover:bg-[#0C71E4]'
                                    }`} />
                                <span className="font-medium text-sm lg:text-base">
                                    {category.name}
                                </span>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform ${currentCategory === category.slug
                                ? 'text-[#0C71E4] rotate-90'
                                : 'text-[#001F3F]/40 group-hover:text-[#0C71E4] group-hover:translate-x-0.5'
                                }`} />
                        </Link>
                    ))}
                </nav>

                <div className="pt-3 mt-3 lg:mt-5 lg:pt-5 border-t border-[#001F3F]/10">
                    <p className="text-xs lg:text-sm opacity-65">
                        {categories.length + 1} categorías disponibles
                    </p>
                </div>
            </div>
        </div>
    )
}