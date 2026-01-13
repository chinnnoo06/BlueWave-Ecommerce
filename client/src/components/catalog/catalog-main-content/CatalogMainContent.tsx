
import { CatalogCategories } from "./CatalogCategories"
import { CatalogProductsList } from "./CatalogProductsList"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { CatalogPaginationButtons } from "./CatalogPaginationButtons"
import { useState } from "react"
import { useAppStore } from "../../../stores/useAppStore"
import { accordionMotion, slideInItem } from "../../../helpers/animations/motion"

type TCatalogMainContentProps = {
    categoryParam: string,
    searchQuery: string | null

}
export const CatalogMainContent = ({categoryParam, searchQuery} : TCatalogMainContentProps) => {
  const [open, setOpen] = useState(false)
  const { products } = useAppStore()

  if(products === undefined || products === null) return 

    return (
        <motion.div {...slideInItem} className="max-w-[1300px] mx-auto px-4 ">

            <div className="lg:hidden mb-5">
                <div className="text-sm text-[#001F3F]/60">
                    <span>Catálogo</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-[#001F3F]">
                        {categoryParam === 'todos' ? 'Todos los productos' : categoryParam}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col lg:flex-row gap-5 ">

                    <div className="hidden lg:block lg:flex-none">
                        <CatalogCategories currentCategory={categoryParam} searchQuery={searchQuery ? searchQuery : ''} />
                    </div>


                    <div className="lg:hidden mb-2 overflow-hidden">

                        <button onClick={() => setOpen(prev => !prev)} className={`w-full flex items-center justify-between ${open && 'mb-3'} `}>

                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-sm text-[#001F3F]">
                                    Categorías de Productos
                                </span>
                                <span className="font-medium text-xs opacity-65 ">
                                    {searchQuery && `Resultados para "${searchQuery}"`}
                                </span>
                            </div>

                            <ChevronDown
                                className={`w-4 h-4 text-[#001F3F]/40 transition-transform ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.div {...accordionMotion}
                                    className="overflow-hidden "
                                >
                                    <CatalogCategories onClose={() => setOpen(false)} currentCategory={categoryParam} searchQuery={searchQuery ? searchQuery : ''} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>


                    <CatalogProductsList currentCategory={categoryParam} />

                </div>

                <CatalogPaginationButtons categoryParam={categoryParam} bool={products.length > 0} />
            </div>

        </motion.div>
    )
}