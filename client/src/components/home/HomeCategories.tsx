import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { useAppStore } from '../../stores/useAppStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CarouselIndicators } from '../ui/CarouselIndicators'
import { useCarouselIndicators } from '../../hooks/useCarouselIndicators'
import { useEffect } from 'react'
import { Spinner } from '../ui/Spinner'
import { slideInBottomInView, slideInLeftInView, slideInRightInView } from '../../helpers/animations/motion'
import { slugify } from '../../helpers/utils/format.utils'
import { GlobalImageCategory } from '../../helpers/config/env'

export const HomeCategories = () => {
    const { getCategories, categories } = useAppStore()

    useEffect(() => {
        getCategories()
    }, [])

    const { carouselRef, itemWidth, activeIndex, scroll } = useCarouselIndicators({
        items: categories,
        minValue: 280,
        smValue: 320,
        lgValue: 340
    })

    if (!categories.length) {
        return <Spinner />
    }

    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <div className="flex justify-between items-center mb-6">
                <motion.div {...slideInLeftInView()}>
                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">Elige tu categoría</h2>
                </motion.div>

                <motion.div {...slideInRightInView()} className='hidden sm:flex gap-5 '>
                    <button
                        onClick={() => scroll('left')}
                        className="bg-transparent border-2 border-[#001F3F] text-[#001F3F] hover:opacity-65 rounded-full w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center cursor-pointer"
                    >
                        <ChevronLeft className=" w-6 h-6 lg:w-7 lg:h-7  text-[#001F3F]" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="bg-transparent border-2 border-[#001F3F] text-[#001F3F] hover:opacity-65 rounded-full  w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center cursor-pointer"
                    >
                        <ChevronRight className=" w-6 h-6 lg:w-7 lg:h-7 text-[#001F3F]" />
                    </button>
                </motion.div>
            </div>

            <motion.div {...slideInBottomInView}>
                <div ref={carouselRef} className="flex overflow-x-auto space-x-4 lg:space-x-5 no-scrollbar scroll-smooth " >
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            style={{ width: `${itemWidth}px` }}
                            className="relative shrink-0 w-[280px] lg:w-[340px] rounded-4xl overflow-hidden group"
                        >
                            <div className='relative flex flex-col gap-5 p-6 bg-[#e2e4f4] h-full pb-52 lg:pb-60'>
                                <h3 className='font-semibold text-lg lg:text-xl text-[#001F3F]'>{category.name}</h3>

                                <div className='h-15 lg:h-20'>
                                    <p className='leading-tight font-medium text-xs lg:text-sm opacity-65'>{category.description}</p>
                                </div>


                                <Link to={`/productos/${slugify(category.name)}`}>
                                    <span className='font-semibold text-[#0C71E4] hover:text-[#0855ae] flex gap-2 items-center'>
                                        Ver todos los productos
                                        <i className="fa-solid fa-angle-right"></i>
                                    </span>
                                </Link>

                                <img
                                    src={`${GlobalImageCategory.url}${category.image}`}
                                    alt={category.name}
                                    className="
                                    absolute 
                                    bottom-0 
                                    -right-5 
                                    w-44
                                    h-44
                                    lg:w-52 
                                    lg:h-52 
                                    object-contain 
                                    transition-transform 
                                    duration-300 
                                    group-hover:hover:scale-[1.03]
                                "
                                />
                            </div>
                        </div>
                    ))}

                </div>

                <CarouselIndicators total={categories.length} activeIndex={activeIndex} />
            </motion.div>

        </div>
    )
}
