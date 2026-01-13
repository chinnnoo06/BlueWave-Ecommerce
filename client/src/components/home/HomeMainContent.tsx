import { motion } from "framer-motion"
import ImgHero from '../../assets/img-hero.png'
import { Link } from "react-router-dom"
import { slideInLeft, slideInRight } from "../../helpers/animations/motion"

export const HomeMainContent = () => {
  return (
    <div className='max-w-[1300px] px-4 mx-auto'>
      <div className="rounded-4xl text-white px-8 lg:px-16 bg-linear-to-r from-[#001F3F] to-[#0C71E4] lg:h-[500px]
        flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-hidden gap-5">

        <motion.div {...slideInLeft()} className="flex flex-col lg:w-[50%] text-center lg:text-start items-center lg:items-start mt-12 lg:mt-0"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
            Eleva Tu Experiencia<br />De Audio
          </h1>

          <p className="text-lg lg:text-xl mt-5 opacity-90">
            Experimenta el sonido en su forma más pura, diseñado para envolverte y elevar cada momento.
          </p>

          <div className="flex flex-col w-full justify-center lg:justify-start sm:flex-row gap-5 mt-5 text-sm lg:text-base">
            <Link to='/catalogo/todos/1'>
              <button className="bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer">
                Comprar Ahora
              </button>
            </Link>

            <button className="font-medium hover:opacity-65 cursor-pointer">
              Más Información
            </button>
          </div>
        </motion.div>

        <motion.div {...slideInRight()} className="lg:w-[50%] flex justify-center lg:justify-end lg:items-end lg:h-full"
        >
          <img
            src={ImgHero}
            alt="Hero"
            className="lg:h-[95%] max-h-[450px]"
          />
        </motion.div>

      </div>
    </div>
  )
}
