import { motion, AnimatePresence } from "framer-motion"
import type { TRegion } from "../../../types/contact.types"
import { ChevronDown } from "lucide-react"
import { accordionMotion } from "../../../helpers/animations/motion"

type TContactStoreCardProps = {
    region: TRegion,
    isActive: boolean,
    onClick: () => void
}

export const ContactStoreCard = ({ region, isActive, onClick }: TContactStoreCardProps) => {
    return (
        <div className="flex flex-col group-hover:scale-[0.97] transition-transform duration-300" onClick={onClick}>

            <div className="bg-[#e2e4f4] p-6 rounded-4xl " >
                <span className='flex items-center justify-between gap-4 font-medium text-[#0C71E4] text-base lg:text-lg'>
                    {region.region}

                    <ChevronDown
                        className={`mt-1 h-5 w-5 transition-transform duration-300 ${isActive ? "rotate-180" : ""
                            }`}
                    />
                </span>

            </div>

            <AnimatePresence initial={false}>
                {isActive && (
                    <motion.div {...accordionMotion} className="overflow-hidden">
                        <div className="flex flex-col gap-5 p-6 ">
                            {region.stores.map((store, index) => {
                                const isLast = index === region.stores.length - 1

                                return (
                                    <div
                                        key={index}
                                        className={`flex flex-col gap-2  ${isLast ? "border-t border-[#001F3F]/25 pt-4" : ""
                                            }`}
                                    >
                                        <p className="leading-tight font-medium text-base lg:text-lg text-[#001F3F]">
                                            {store.name}
                                        </p>

                                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                            {store.ubication}
                                        </p>

                                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                            Horario: {store.schedule}
                                        </p>

                                        <p className="leading-tight font-medium text-sm lg:text-base opacity-65">
                                            Teléfono: {store.phone}
                                        </p>
                                    </div>
                                )
                            })}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    )
}
