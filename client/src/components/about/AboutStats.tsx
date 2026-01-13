import { motion } from "framer-motion"
import { slideInBottomInView } from "../../helpers/animations/motion"

export const AboutStats = () => {
    return (
        <motion.div {...slideInBottomInView} className="max-w-[1300px] mx-auto px-4 ">
            <div className="grid grid-cols-1 s:grid-cols-2 md:grid-cols-4 justify-center text-center gap-20 rounded-4xl bg-[#e2e4f4] p-10">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bebas font-semibold text-5xl lg:text-6xl text-[#0C71E4]">20+</h3>
                    <p className="leading-tight font-medium text-base lg:text-lg opacity-65">Años de experiencia</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-bebas font-semibold text-5xl lg:text-6xl text-[#0C71E4]">100+</h3>
                    <p className="leading-tight font-medium text-base lg:text-lg opacity-65">Productos de audio</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-bebas font-semibold text-5xl lg:text-6xl text-[#0C71E4]">10+</h3>
                    <p className="leading-tight font-medium text-base lg:text-lg opacity-65">Premios del sector</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bebas font-semibold text-5xl lg:text-6xl text-[#0C71E4]">100K+</h3>
                    <p className="leading-tight font-medium text-base lg:text-lg opacity-65">Miembros de la comunidad</p>
                </div>
            </div>

        </motion.div>
    )
}
