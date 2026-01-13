import { motion } from "framer-motion"
import { ContactUsForm } from "./ContactUsForm"
import { contactTargets } from "../../../data"
import { slideInBottom, slideInLeft, slideInRight } from "../../../helpers/animations/motion"

export const ContactUs = () => {
    return (
        <div className="max-w-[1300px] px-4 mx-auto">

            <motion.div {...slideInBottom} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2.5rem] lg:text-[3rem] mb-6 relative inline-block">
                    Contáctanos
                </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

                <motion.div {...slideInLeft()} className="flex flex-col lg:w-1/2">
                    <ContactUsForm />
                </motion.div>

                <motion.div {...slideInRight()} className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-5 lg:items-end lg:w-1/2 lg:justify-center">

                    {contactTargets.map((target, index) => (
                        <div key={index} className="flex flex-col gap-2 p-6 w-full lg:w-md bg-white shadow-lg rounded-4xl hover:scale-[1.03] transition-transform duration-300">

                            <span className='flex items-center gap-4 font-medium text-[#0C71E4] text-base lg:text-lg'>
                                <target.icon className=" w-4 h-4 xl:w-5 xl:h-5 " />

                                {target.title}
                            </span>

                            <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                {target.text}
                            </p>

                        </div>
                    ))}

                </motion.div>
            </div>

        </div>
    )
}
