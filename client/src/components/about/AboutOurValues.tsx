import { motion } from "framer-motion"
import { ourValues } from "../../data"
import { slideInBottomInView, slideInLeftInView, slideInRightInView } from "../../helpers/animations/motion"

export const AboutOurValues = () => {
    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <div className="flex justify-between items-center mb-6">
                <motion.div {...slideInLeftInView()}>
                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">Nuestros valores</h2>
                </motion.div>

                <motion.div {...slideInRightInView()} className="hidden sm:block">

                    <button className="bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm lg:text-base">
                        Ver todos los Productos
                    </button>

                </motion.div>
            </div>

            <motion.div {...slideInBottomInView} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ourValues.map(value => (
                    <div key={value.title} className="flex flex-col gap-4 p-4 border-l border-[#001F3F]/25">
                        <value.icon className=" w-8 h-8  xl:w-10 xl:h-10 text-[#001F3F]" />

                        <h3 className="font-semibold text-xl lg:text-2xl text-[#001F3F]">{value.title}</h3>

                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                           {value.text}
                        </p>

                    </div>
                ))}
            </motion.div>

            <motion.div {...slideInBottomInView} className="flex justify-center sm:hidden mt-10">

                <button className="bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-base">
                    Ver todos los Productos
                </button>

            </motion.div>

        </div>
    )
}
