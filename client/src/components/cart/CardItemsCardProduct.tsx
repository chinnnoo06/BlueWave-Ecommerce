import { Trash2 } from "lucide-react"
import { useHandleActionToCard } from "../../hooks/useHandleActionToCard"
import type { TCartItem } from "../../types/cart.types"
import { GlobalImageProduct } from "../../helpers/config/env"
import { getOriginalPrice } from "../../helpers/utils/product.utils"

type TCardItemsCardProductProps = {
    item: TCartItem
    index: number
    length?: number,
    isPurchase?: boolean
}

export const CardItemsCardProduct = ({ item, index, length, isPurchase = false }: TCardItemsCardProductProps) => {
    const { loading, handleActionToCart } = useHandleActionToCard({ productId: item.productId, selectedColor: item.selectedColor})
    
    return (
        <div className={`flex flex-col sm:flex-row gap-5 rounded-lg sm:items-center
                ${length !== undefined && index < length - 1 ? "mb-10" : ""}`}>

            <div className="relative w-full sm:w-40 h-40 rounded-lg flex items-center justify-center">
                <img
                    src={`${GlobalImageProduct.url}${item.colorImage}`}
                    alt={item.productName}
                    loading="lazy"
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex-1 flex flex-col">

                <div className="flex-1 flex flex-col md:flex-row gap-3 pb-4">

                    <div className="flex-1 space-y-3">
                        <p className="font-semibold leading-tight line-clamp-1 opacity-65 text-sm lg:text-base">
                            {item.category}
                        </p>
                        <h3 className="leading-tight line-clamp-2  text-base lg:text-lg text-[#001F3F]">
                            {item.productName}
                        </h3>
                        <div className="flex items-center gap-2 ">
                            <span className="text-sm lg:text-base text-[#001F3F] font-medium">
                                Color:
                            </span>
                            <button
                                className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-gray-200"
                                style={{ backgroundColor: item.selectedColorHex || "#ccc" }}
                                aria-label={`Color ${item.selectedColorHex}`}
                            />
                        </div>
                    </div>


                    {item.discountPercentage > 0 ? (
                        <div className="flex flex-row gap-2 lg:flex-col lg:gap-0">
                            <p className="text-[#001F3F] font-semibold text-sm lg:text-base">
                                MXN {item.price.toFixed(2)}
                            </p>
                            <p className="text-[#001F3F] font-semibold line-through opacity-65 text-sm lg:text-base">
                                MXN {getOriginalPrice(item.price, item.discountPercentage).toFixed(2)}
                            </p>
                        </div>
                    ) : (
                        <p className="text-[#001F3F] font-semibold text-sm lg:text-base">
                            MXN {item.price.toFixed(2)}
                        </p>
                    )}

                </div>

                {!isPurchase ? (
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 pt-4 border-t border-[#001F3F]/25">
                        <div className="flex items-center gap-2">
                            {item.quantity > 1 && (
                                <button
                                    disabled={loading}
                                    onClick={() => handleActionToCart("decrease")}
                                    className="px-3 py-1 text-sm text-white bg-[#0C71E4] hover:bg-[#0855ae] rounded transition-colors"
                                >
                                    -
                                </button>
                            )}
                            <span className="w-12 text-center py-1 bg-[#EEEEEF] text-sm lg:text-base rounded">
                                {item.quantity}
                            </span>
                            <button
                                disabled={loading}
                                onClick={() => handleActionToCart("add")}
                                className="px-3 py-1 text-sm text-white bg-[#0C71E4] hover:bg-[#0855ae] rounded transition-colors"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm opacity-65 font-medium">
                                    Subtotal ({item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'})
                                </p>
                                <p className="text-base font-semibold text-[#001F3F]">
                                    MXN {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>

                            <button
                                disabled={loading}
                                onClick={() => handleActionToCart("remove")}
                                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm lg:text-base transition-colors"
                                aria-label="Eliminar producto del carrito"
                            >
                                <Trash2 size={16} />
                                Eliminar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 pt-4 border-t border-[#001F3F]/25">

                        <p className="font-semibold leading-tight line-clamp-1 opacity-65 text-sm lg:text-base">
                            Cantidad: <span className="font-normal">{item.quantity}</span>
                        </p>

                        <div className="text-right">
                            <p className="text-sm opacity-65 font-medium">
                                Subtotal ({item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'})
                            </p>
                            <p className="text-base font-semibold text-[#001F3F]">
                                MXN {(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}