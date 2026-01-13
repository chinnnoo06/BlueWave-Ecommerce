import { motion } from "framer-motion"
import { CardItemsCardProduct } from "./CardItemsCardProduct"
import type { TCartItem } from "../../types/cart.types"
import { slideInLeft } from "../../helpers/animations/motion"

type TCartItemsProps = {
  items: TCartItem[]
}

export const CartItems = ({ items } : TCartItemsProps) => {
 
  return (
    <motion.div {...slideInLeft()} className='flex flex-col w-full lg:w-[70%] p-6 rounded-xl shadow-sm'>
      <div className="space-y-10">
        {items.map((item, index) => (
          <div key={index}>
            <CardItemsCardProduct item={item} index={index} length={items.length} />
            {index < items.length - 1 && <div className="border-t-2 border-[#001F3F]/25" />}
          </div>
        ))}

      </div>
    </motion.div>
  )
}
