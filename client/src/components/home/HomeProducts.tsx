
import { motion } from "framer-motion"
import { useAppStore } from "../../stores/useAppStore"
import { ProductCart } from "../product/ProductCart"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CarouselIndicators } from "../ui/CarouselIndicators"
import { useCarouselIndicators } from "../../hooks/useCarouselIndicators"
import { useEffect } from "react"
import { Spinner } from "../ui/Spinner"
import { Link } from "react-router-dom"
import { slideInBottomInView, slideInLeftInView, slideInRightInView } from "../../helpers/animations/motion"

export const HomeProducts = () => {
    const { getHomeProducts, homeProducts } = useAppStore()

    useEffect(() => {
        getHomeProducts()
    }, [])

    const { carouselRef, itemWidth, activeIndex, scroll } = useCarouselIndicators({
        items: homeProducts,
        minValue: 200,
        smValue: 240,
        lgValue: 280
    })

    if (!homeProducts.length) {
        return <Spinner />
    }
    return (
        <div className='max-w-[1300px] px-4 mx-auto '>

            <div className="flex justify-between items-center mb-6">
                <motion.div {...slideInLeftInView()}>
                    <h2 className=" text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">
                        Productos Top
                    </h2>
                </motion.div>

                <motion.div {...slideInRightInView()} className="hidden sm:flex gap-5">
                    <button
                        onClick={() => scroll('left')}
                        className="bg-transparent border-2 border-[#001F3F] text-[#001F3F] hover:opacity-65 rounded-full w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="bg-transparent border-2 border-[#001F3F] text-[#001F3F] hover:opacity-65 rounded-full w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center cursor-pointer"
                    >
                        <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
                    </button>
                </motion.div>
            </div>


            <motion.div {...slideInBottomInView}>
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto space-x-4 lg:space-x-5 no-scrollbar scroll-smooth"
                >
                    {homeProducts.map((product) => (
                        <div
                            key={product._id}
                            style={{ width: `${itemWidth}px` }}
                            className="relative shrink-0 bg-transparent transition-all duration-200 group"
                        >
                            <ProductCart key={product._id} product={product} />
                        </div>

                    ))}
                </div>

                <CarouselIndicators total={homeProducts.length} activeIndex={activeIndex} />
            </motion.div>

            <motion.div {...slideInBottomInView} className="flex justify-center mt-10">
                <Link to='/catalogo/todos/1'>
                    <button className="bg-[#0C71E4] text-white px-3 py-1.5 lg:py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-[#0855ae] transition cursor-pointer">
                        Ver todos los productos
                    </button>
                </Link>
            </motion.div>
        </div>
    )
}
