import { useEffect, useState } from "react"
import type { TProductProps } from "./types"
import { motion } from "framer-motion"
import { slideInLeft } from "../../helpers/animations/motion"
import { GlobalImageProduct } from "../../helpers/config/env"
import { isNewProduct } from "../../helpers/utils/product.utils"

export const ProductImg = ({ product, selectedColor }: TProductProps) => {
    const images = product.colors[selectedColor]?.images ?? []

    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        setActiveImageIndex(0)
    }, [selectedColor])

    if (images.length === 0) return null
    return (
        <motion.div {...slideInLeft()} className='w-full lg:w-[50%] flex justify-center items-center flex-col-reverse lg:flex-row'>

            <div className="w-full lg:w-[15%] flex flex-row lg:flex-col justify-center gap-5 overflow-y-auto">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`border rounded-md overflow-hidden transition cursor-pointer
                            ${index === activeImageIndex
                                ? "border-[#0C71E4]"
                                : "border-gray-300 hover:border-gray-400"}
                            `}
                    >
                        <img
                            src={`${GlobalImageProduct.url}${img}`}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full max-h-16 sm:max-h-18 md:max-h-20 lg:max-h-none aspect-square object-contain "
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>
            <div className='relative w-full lg:w-[85%] max-h-[450px] aspect-square flex items-center justify-center'>
                {(product.promotion.active || isNewProduct(product.createdAt)) && (
                    <span
                        className='absolute top-1 right-5 text-[#EEEEEF] text-xs lg:text-sm font-semibold px-2 py-0.5 rounded z-10
                                                                bg-linear-to-r from-[#001F3F] to-[#0C71E4]'
                    >
                        {product.promotion.active ? `${product.promotion.discountPercentage}% OFF` : 'Nuevo'}
                    </span>
                )}
                <img
                    src={`${GlobalImageProduct.url}${product.colors[selectedColor].images[activeImageIndex]}`}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                />
            </div>
        </motion.div>
    )
}
