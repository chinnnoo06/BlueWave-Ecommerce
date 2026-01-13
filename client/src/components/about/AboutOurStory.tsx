import Img from '../../assets/img-our-story.jpg'
import { motion } from "framer-motion"
import { slideInBottom, slideInLeft, slideInRight } from '../../helpers/animations/motion'

export const AboutOurStory = () => {
    return (
        <div className='max-w-[1300px] px-4 mx-auto'>
            <motion.div {...slideInBottom} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">
                    Sobre BlueWave
                </h2>
            </motion.div>

            <div className="relative flex flex-col lg:flex lg:items-center lg:flex-row">
                <motion.div {...slideInLeft()} className="w-full lg:w-1/2">
                    <div className="aspect-square w-full overflow-hidden rounded-4xl max-h-[600px] lg:max-h-none">
                        <img
                            src={Img}
                            alt="Producto"
                            className="w-full h-full object-cover "
                        />
                    </div>
                </motion.div>

                <motion.div {...slideInRight()}
                    className="
                        bg-white
                        rounded-4xl
                        shadow-lg
                        p-8
                        z-10
                        relative

                        /* 📱 < sm: normal, debajo de la imagen */
                        w-full
                        mt-5

                        /* 📱 sm–md: sobrepuesta, centrada y más angosta */
                        sm:-mt-24
                        md:-mt-28
                        sm:mx-auto
                        sm:w-[80%]
                        md:w-[70%]
                        
                        /* 💻 lg+: comportamiento actual */
                        lg:mt-0
                        lg:absolute
                        lg:right-1
                        lg:top-1/2
                        lg:-translate-y-1/2
                        lg:w-[55%]
                    "
                >

                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] mb-2 relative inline-block">
                        Nuestra Historia
                    </h2>

                    <div className="space-y-3">
                        <p className="leading-relaxed font-medium text-base lg:text-lg text-[#001F3F]/65">
                            Nacimos con una idea clara: ofrecer experiencias de sonido que conecten con las personas,
                            combinando diseño, tecnología y calidad.
                        </p>

                        <p className="leading-relaxed font-medium text-base lg:text-lg text-[#001F3F]/65">
                            Trabajamos junto a marcas y expertos para crear un catálogo confiable,
                            pensado para el día a día y experiencias más profesionales.
                        </p>

                        <p className="leading-relaxed font-medium text-base lg:text-lg text-[#001F3F]/65">
                            Seguimos creciendo con innovación, manteniendo nuestra pasión por el audio y la calidad.
                        </p>
                    </div>
                </motion.div>
            </div>

        </div>

    )
}