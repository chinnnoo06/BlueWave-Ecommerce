import { motion } from "framer-motion"
import { ContactStoreCard } from "./ContactStoreCard"
import { useState } from "react";
import { regions } from "../../../data";
import { slideInBottomInView } from "../../../helpers/animations/motion";

export const ContactFindStore = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const leftColumn = regions.filter((_, i) => i % 2 === 0)
    const rightColumn = regions.filter((_, i) => i % 2 !== 0)

    return (
        <div className="max-w-[1300px] px-4 mx-auto ">

            <motion.div {...slideInBottomInView} className="border-t border-[#001F3F]/25 pb-15"></motion.div>

            <motion.div {...slideInBottomInView} className="text-center">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] mb-6 relative inline-block">
                    Encuentra una tienda cerca de ti
                </h2>
            </motion.div>

            <motion.div {...slideInBottomInView} className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <div className="flex flex-col gap-5 ">
                    {leftColumn.map((region, index) => {
                        const realIndex = index * 2
                        return (
                            <div className="group" key={realIndex}>
                                <ContactStoreCard
                                    region={region}
                                    isActive={activeIndex === realIndex}
                                    onClick={() =>
                                        setActiveIndex(prev =>
                                            prev === realIndex ? null : realIndex
                                        )
                                    }
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="flex flex-col gap-5 ">
                    {rightColumn.map((region, index) => {
                        const realIndex = index * 2 + 1
                        return (
                            <div className="group" key={realIndex}>
                                <ContactStoreCard
                                    region={region}
                                    isActive={activeIndex === realIndex}
                                    onClick={() =>
                                        setActiveIndex(prev =>
                                            prev === realIndex ? null : realIndex
                                        )
                                    }
                                />
                            </div>

                        )
                    })}
                </div>
            </motion.div>
        </div>

    )
}
