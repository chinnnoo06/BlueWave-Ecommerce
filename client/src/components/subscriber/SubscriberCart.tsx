import Img from '../../assets/img-subscribe.jpg';
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { SubscriberCartForm } from '../subscriber/SubscriberCartForm';
import { slideInBottomInView } from '../../helpers/animations/motion';

export const SubscriberCart = () => {
    return (
        <div className='max-w-[1300px] px-4 mx-auto'>

            <motion.div {...slideInBottomInView} className=' bg-white shadow-lg rounded-4xl flex flex-col lg:flex-row'>

                <div className="w-full lg:w-1/3 h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto">
                    <img
                        src={Img}
                        alt="Subscribe"
                        className="w-full h-full object-cover
                       rounded-t-4xl lg:rounded-t-none lg:rounded-l-4xl"
                    />
                </div>

                <div className='flex flex-col justify-center p-8 lg:max-w-2/3 flex-1 '>

                    <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] mb-2 relative inline-block">Entra a nuestra lista hoy!</h2>

                    <p className='font-medium opacity-65 text-sm lg:text-base'>Se el primero en enterarte de todas las novedades</p>

                    <div className='grid lg:grid-cols-2 mt-10 gap-5 lg:gap-10'>
                        <div className='flex flex-col gap-5'>
                            <span className='flex items-center gap-4 font-medium text-[#001F3F] text-base lg:text-lg'>
                                <CheckCircle className=" w-4 h-4 xl:w-5 xl:h-5 text-[#0C71E4]" />

                                Productos Exclusivos
                            </span>

                            <span className='flex items-center gap-4 font-medium text-[#001F3F] text-base lg:text-lg'>
                                <CheckCircle className=" w-4 h-4 xl:w-5 xl:h-5 text-[#0C71E4]" />
                                Contenido Exclusivo
                            </span>
                        </div>

                        <div className='flex flex-col gap-5'>
                            <span className='flex items-center gap-4 font-medium text-[#001F3F] text-base lg:text-lg'>
                                <CheckCircle className=" w-4 h-4 xl:w-5 xl:h-5 text-[#0C71E4]" />
                                Ofertas Especiales
                            </span>

                            <span className='flex items-center gap-4 font-medium text-[#001F3F] text-base lg:text-lg'>
                                <CheckCircle className=" w-4 h-4 xl:w-5 xl:h-5 text-[#0C71E4]" />
                                Artículos Interesantes
                            </span>
                        </div>
                    </div>

                    <SubscriberCartForm/>
                </div>
            </motion.div>


        </div>
    )
}
