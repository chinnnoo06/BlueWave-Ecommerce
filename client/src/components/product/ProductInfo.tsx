import { Heart, ShieldCheck, Truck } from "lucide-react"
import type { TProduct } from "../../types/product.types"
import { ModalToLogin } from "../ui/ModalToLogin"
import { motion } from "framer-motion"
import { useProductActons } from "../../hooks/useProductActons"
import { slideInRight } from "../../helpers/animations/motion"
import { discountPrice } from "../../helpers/utils/product.utils"

export type TProductProps = {
    product: TProduct,
    selectedColor: number,
    setSelectedColor: React.Dispatch<React.SetStateAction<number>>
}

export const ProductInfo = ({ product, selectedColor, setSelectedColor }: TProductProps) => {
    const {loading, loadingAction, isFavorite, currentItemInCart, showModal, actions} = useProductActons({ product, selectedColor})

    return (
        <>
            <motion.div {...slideInRight()} className='w-full lg:w-[50%] flex flex-col justify-center gap-3 lg:gap-5'>

                <div className="space-y-0 lg:space-y-2">
                    <p className='opacity-65 font-semibold text-xl lg:text-2xl '>
                        {product.category}
                    </p>

                    <h3 className='text-[#001F3F] font-semibold text-2xl lg:text-3xl'>
                        {product.name}
                    </h3>

                </div>

                {product.promotion.active ? (
                    <div className="flex flex-row gap-2 text-lg lg:text-xl">
                        <p className="text-[#001F3F] font-semibold">
                            MXN {discountPrice(product.price, product.promotion.discountPercentage).toFixed(2)}
                        </p>
                        <p className="text-[#001F3F] font-semibold line-through opacity-65 ">
                            MXN {product.price.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-[#001F3F] font-semibold text-lg lg:text-xl">
                        MXN {product.price.toFixed(2)}
                    </p>
                )}

                <span className='opacity-85 text-sm lg:text-base font-medium block'>
                    {product.description}
                </span>

                <div className="flex flex-col s:flex-row md:flex-col lg:flex-row gap-3 lg:gap-5 justify-between">
                    <div className="flex items-center gap-3">
                        {product.colors.map((c, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedColor(index)}
                                className={`w-6 h-6 lg:w-7 lg:h-7 rounded-full transition-all cursor-pointer
                                border-2
                                ${selectedColor === index
                                        ? "border-[#0C71E4] scale-110"
                                        : "border-[#001F3F]/20 hover:border-[#001F3F]/40"}
                            `}
                                style={{ backgroundColor: c.hex }}
                                aria-label={c.color}
                            />
                        ))}
                    </div>

                    <div className="flex gap-5 items-center">
                        {product.price > 499 && (

                            <div className="flex gap-2 items-center">
                                <Truck className="text-[#0C71E4] w-5 h-5 lg:w-6 lg:h-6" />
                                <p className="text-[#001F3F] text-sm lg:text-base font-medium">
                                    Envio Gratis
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2 items-center">
                            <ShieldCheck className=" text-[#0C71E4] w-5 h-5 lg:w-6 lg:h-6" />
                            <p className="text-[#001F3F] text-sm lg:text-base font-medium">
                                Garantía Incluida
                            </p>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-5 ">
                    {currentItemInCart ? (
                        <div className="flex-1 bg-[#0C71E4] flex justify-between px-3 py-1.5 lg:py-2 rounded-lg font-medium  text-white text-sm lg:text-base">
                            <button className="font-semibold hover:opacity-65 cursor-pointer disabled:opacity-25" disabled={loadingAction} onClick={() => actions.handleActionToCart("decrease")}>-</button>
                            {currentItemInCart.quantity}
                            <button className="font-semibold hover:opacity-65 cursor-pointer" disabled={loadingAction} onClick={() => actions.handleActionToCart("add")}>+</button>
                        </div>

                    ) : (
                        <button
                            disabled={loadingAction}
                            onClick={() => actions.handleActionToCart("add")}
                            className="flex-1 bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base">
                            Agregar al carrito
                        </button>

                    )}

                    <button
                        onClick={actions.handleFavorite}
                        className={`flex items-center justify-center gap-2  px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm lg:text-base
                    ${isFavorite ? 'text-[#0C71E4] border border-[#0C71E4]/ hover:border-[#001F3F]/20 hover:text-[#001F3F]' :
                                'text-[#001F3F] border border-[#001F3F]/20 hover:border-[#0C71E4] hover:text-[#0C71E4]'} group `}
                        disabled={loading}>
                        <Heart
                            className="w-5 h-5 transition-colors text-current"
                            fill={isFavorite ? "currentColor" : "none"}
                        />
                        Favoritos
                    </button>

                </div>
            </motion.div>

            <ModalToLogin showModal={showModal} onClose={() => actions.setShowModal(false)} />
        </>

    )
}
