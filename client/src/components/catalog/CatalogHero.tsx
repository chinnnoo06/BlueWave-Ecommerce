import { motion } from "framer-motion"
import ImgHero from '../../assets/catalog-image.png'
import { slideInLeft, slideInRight } from "../../helpers/animations/motion"

export const CatalogHero = () => {
    return (
        <div className='max-w-[1300px] px-4 mx-auto'>
            <div className="rounded-4xl text-white px-8 lg:px-16 bg-linear-to-r from-[#001F3F] to-[#0C71E4] lg:h-[350px]
            flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-hidden gap-5">

                <motion.div {...slideInLeft()} className="flex flex-col lg:w-[50%] text-center lg:text-start items-center lg:items-start mt-12 lg:mt-0"
                >
                    <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
                        Explora Nuestros<br />Productos
                    </h1>

                    <p className="text-lg lg:text-xl mt-5 opacity-90">
                        Lleva tu música a otro nivel. Descubre una selección de auriculares y altavoces creados para quienes no se conforman con menos que la perfección acústica.
                    </p>
                </motion.div>

                <motion.div {...slideInRight()} className="lg:w-[50%] flex justify-center lg:justify-end lg:items-end lg:h-full"
                >
                    <img
                        src={ImgHero}
                        alt="Hero"
                        className="lg:h-[95%] max-h-[300px]"
                    />
                </motion.div>

            </div>
        </div>

    )
}
