import Img from '../../assets/img-why-blueave.png';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { slideInBottomInView } from '../../helpers/animations/motion';

export const HomeWhyBlueWave = () => {
    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <motion.div {...slideInBottomInView} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] mb-12 relative inline-block">
                    ¿Por qué BlueWave?
                </h2>
            </motion.div>

            <div className="flex flex-col justify-center w-full">
                <motion.div {...slideInBottomInView} className="flex flex-col lg:flex-row items-center text-center gap-10">

                    <div className="flex flex-col justify-center gap-10 lg:gap-20 lg:w-1/3">

                        <div className="flex flex-col gap-2 mg:gap-5 text-center lg:h-[150px]">
                            <h3 className="font-semibold text-2xl lg:text-3xl text-[#001F3F]">
                                Colaboramos con las mejores marcas
                            </h3>

                            <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                Trabajamos con marcas reconocidas de la industria del audio para ofrecerte productos originales, confiables y con la más alta calidad sonora.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mg:gap-5 text-center lg:h-[150px]">
                            <h3 className="font-semibold text-2xl lg:text-3xl text-[#001F3F]">
                                Calidad garantizada
                            </h3>

                            <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                Cada producto que ofrecemos pasa por un proceso de selección para asegurar un excelente rendimiento, durabilidad y experiencia de audio.
                            </p>
                        </div>

                    </div>

                    <div className="flex flex-col justify-center items-center ">
                        <img
                            src={Img}
                            className=" w-56 h-56 lg:w-72 lg:h-72  object-contain "
                        />
                    </div>

                    <div className="flex flex-col justify-center gap-10 lg:gap-20 lg:w-1/3 ">

                        <div className="flex flex-col gap-2 mg:gap-5 text-center lg:h-[150px]">
                            <h3 className="font-semibold text-2xl lg:text-3xl text-[#001F3F]">
                                Atención y asesoría
                            </h3>

                            <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                Te ayudamos a elegir el producto ideal según tus necesidades, ya sea para uso personal, profesional o entretenimiento.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mg:gap-5 text-center lg:h-[150px]">
                            <h3 className="font-semibold text-2xl lg:text-3xl text-[#001F3F]">
                                Compra segura y respaldo
                            </h3>

                            <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                Ofrecemos procesos de compra seguros, envíos confiables y garantía en todos nuestros productos para tu total tranquilidad.
                            </p>
                        </div>

                    </div>

                </motion.div>

                <motion.div {...slideInBottomInView} className="flex flex-col items-center sm:justify-center sm:flex-row gap-5 mt-10">
                    <Link to='/catalogo/todos/1'>
                        <button className="bg-[#0C71E4] text-white px-3 py-1.5 lg:py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-[#0855ae] transition cursor-pointer">
                            Comprar Ahora
                        </button>
                    </Link>
                    <Link to={'/sobre-nosotros'}>
                        <button className="text-[#001F3F] font-medium text-sm lg:text-base hover:text-[#0C71E4] transition cursor-pointer">
                            Más Información
                        </button>
                    </Link>

                </motion.div>

            </div>

        </div>
    )
}
