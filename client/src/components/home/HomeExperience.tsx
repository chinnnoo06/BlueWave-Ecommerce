import { motion } from "framer-motion"
import { Truck, Package, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { slideInBottomInView } from "../../helpers/animations/motion"

export const HomeExperience = () => {
    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <motion.div {...slideInBottomInView} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] mb-12 relative inline-block">
                    Una experiencia de compra optimizada con BlueWave
                </h2>
            </motion.div>

            <div className="flex flex-col justify-center w-full">
                <motion.div {...slideInBottomInView} className="flex flex-col md:flex-row items-center text-center gap-10">

                    <div className="flex flex-col justify-center gap-2 mg:gap-5 md:w-1/3">
                        <div className="flex flex-col gap-3 items-center text-center text-[#001F3F]">
                            <Truck className=" w-14 h-14  xl:w-16 xl:h-16 text-[#001F3F]" />
                            <h3 className="font-semibold text-2xl lg:text-3xl">Envio Gratis</h3>
                        </div>

                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                            Disfruta de envío gratis en compras seleccionadas, con entregas seguras y rápidas hasta la puerta de tu hogar.
                        </p>

                    </div>


                    <div className="flex flex-col justify-center gap-2 mg:gap-5 md:w-1/3">
                        <div className="flex flex-col gap-3 items-center text-center text-[#001F3F]">
                            <Package className=" w-14 h-14  xl:w-16 xl:h-16 text-[#001F3F]" />
                            <h3 className="font-semibold text-2xl lg:text-3xl">Entregas perfectas</h3>
                        </div>

                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                            Cuidamos cada detalle del empaque para que tus productos lleguen protegidos, seguros y en óptimas condiciones hasta tu hogar.
                        </p>

                    </div>


                    <div className="flex flex-col justify-center gap-2 mg:gap-5 md:w-1/3">
                        <div className="flex flex-col gap-3 items-center text-center text-2xl lg:text-3xl text-[#001F3F]">
                            <ShieldCheck className=" w-14 h-14 xl:w-16 xl:h-16 text-[#001F3F]" />
                            <h3 className="font-semibold text-2xl lg:text-3xl">Garantia</h3>
                        </div>

                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                            Respaldamos cada producto para que compres con total tranquilidad y seguridad en cada pedido.
                        </p>

                    </div>

                </motion.div>

                <motion.div {...slideInBottomInView} className="flex justify-center mt-10">
                    <Link to='/catalogo/todos/1'>
                        <button className="bg-[#0C71E4] text-white px-3 py-1.5 lg:py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-[#0855ae] transition cursor-pointer">
                            Comprar Ahora
                        </button>
                    </Link>
                </motion.div>

            </div>

        </div>
    )
}
