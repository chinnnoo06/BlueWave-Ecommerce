import { AnimatePresence, motion } from "framer-motion"
import { frequentlyQuestions } from "../../data"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { accordionMotion, slideInBottomInView } from "../../helpers/animations/motion"

export const ContactFrequentlyQuestions = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
        <div className="max-w-[1300px] px-4 mx-auto">
            <motion.div {...slideInBottomInView} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] mb-6 relative inline-block">
                    Preguntas Frecuentes
                </h2>
            </motion.div>

            <motion.div {...slideInBottomInView} className="flex flex-col items-center gap-5">
                {frequentlyQuestions.map((question, index) => (
                    <div key={index} className="flex flex-col w-full lg:w-3/5 group" onClick={() => setActiveIndex(prev => prev === index ? null : index)}>

                        <div className="bg-white p-6 rounded-4xl group-hover:scale-[0.97] transition-transform duration-300">
                            <span
                                className="flex items-center justify-between gap-4 font-medium text-[#001F3F] group-hover:text-[#0C71E4] duration-300 text-base lg:text-lg"
                            >
                                {question.question}

                                <PlusCircle
                                    className={`mt-1 h-4 w-4 lg:h-5 lg:w-5 shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-45" : ""
                                        }`}
                                />
                            </span>

                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        {...accordionMotion}
                                        className="flex flex-col gap-5 mt-4 border-t border-[#001F3F]/25"
                                    >
                                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65 pt-4">
                                            {question.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                ))}
            </motion.div>
        </div >


    )
}

