import Marquee from "react-fast-marquee"
import { Truck, Tag } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type TPromo = {
  icon: LucideIcon
  text: string
}

const promos: TPromo[] = [
  {
    icon: Truck,
    text: "ENVÍO GRATIS A PARTIR DE $499",
  },
  {
    icon: Tag,
    text: "HASTA 30% DE DESCUENTO EN PRODUCTOS SELECCIONADOS",
  },
]

export const TopBar = () => {
  return (
    <Marquee
      speed={100}
      gradient={false}
      className="font-poppins bg-[#2F3340] text-white py-2 lg:py-3 font-semibold text-xs lg:text-sm"
    >
      {[...promos, ...promos].map((item, index) => {
        const Icon = item.icon

        return (
          <span
            key={index}
            className="mx-10 flex items-center gap-3"
          >
            <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            {item.text}
          </span>
        )
      })}
    </Marquee>
  )
}
