import { useNavigate } from "react-router-dom"
import type { TProduct } from "../../types/product.types"
import { useState } from "react"
import type { TPagination } from "../../stores/productSlice"
import { discountPrice, isNewProduct } from "../../helpers/utils/product.utils"
import { GlobalImageProduct } from "../../helpers/config/env"

type TProductCart = {
    product: TProduct,
    currentCategory?: string,
    page?: TPagination['page']
}

export const ProductCart = ({ product, currentCategory, page }: TProductCart) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = product.colors.flatMap(color => color.images);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <>
            {(product.promotion.active || isNewProduct(product.createdAt)) && (
                <span
                    className='absolute top-1 left-1 text-[#EEEEEF] text-xs lg:text-sm font-semibold px-2 py-0.5  :py-1 rounded z-10
                                        bg-linear-to-r from-[#001F3F] to-[#0C71E4]'
                >
                    {product.promotion.active ? `${product.promotion.discountPercentage}% OFF` : 'Nuevo'}
                </span>
            )}

            <div className='w-full relative overflow-hidden '>
                <img
                    src={`${GlobalImageProduct.url}${images[currentIndex]}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105  max-h-[300px]"
                    onClick={() => {
                        navigate(`/producto/${product.slug}--${product._id}`, {
                            state: {
                                currentCategory,
                                page,
                                productId: product._id, 
                            }
                        })
                    }}
                />

                {images.length > 1 && (
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full  w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                        <i className="fa-solid fa-angle-left text-sm lg:text-base"></i>
                    </button>
                )}

                {images.length > 1 && (
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                        <i className="fa-solid fa-angle-right text-sm lg:text-base"></i>
                    </button>
                )}

            </div>

            <div className="flex justify-center gap-1 mt-2">
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${i === currentIndex ? 'bg-[#0C71E4]' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>

            <div className="w-full space-y-2 text-xs lg:text-sm mt-5">
                <p className="font-semibold leading-tight line-clamp-1 opacity-65">
                    {product.category}
                </p>

                <h3 className="leading-tight line-clamp-2 text-[#001F3F]">
                    {product.name}
                </h3>

                {product.promotion.active ? (
                    <div className="flex flex-col s:flex-row s:gap-2">
                        <p className="text-[#001F3F] font-semibold">
                            MXN {discountPrice(product.price, product.promotion.discountPercentage).toFixed(2)}
                        </p>
                        <p className="text-[#001F3F] font-semibold line-through opacity-65 ">
                            MXN {product.price.toFixed(2)}
                        </p>
                    </div>

                ) : (
                    <p className="text-[#001F3F] font-semibold">
                        MXN {product.price.toFixed(2)}
                    </p>
                )}

                <div className='flex gap-2' >
                    {product.colors.map((c, index) => (
                        <button
                            key={index}
                            className='w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 transition-all
                                            border-gray-200 hover:border-gray-300'
                            style={{ backgroundColor: c.hex || '#ccc' }}

                        >
                        </button>
                    ))}
                </div>

            </div>
        </>
    )
}
