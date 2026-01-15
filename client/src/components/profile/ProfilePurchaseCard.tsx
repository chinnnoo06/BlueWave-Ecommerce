import { ArrowRight, CreditCard, Truck } from "lucide-react"
import type { TPurchase } from "../../types/purchase.types"
import defaultImage from '../../assets/image-default.jpg'
import { Link } from "react-router-dom"
import { GlobalImageProduct } from "../../helpers/config/env"

type TProfilePurchaseCard = {
    purchase: TPurchase,
    index: number
    length?: number
}

export const ProfilePurchaseCard = ({ purchase, index, length }: TProfilePurchaseCard) => {

    return (
        <div className={`flex flex-col gap-5 rounded-lg  ${length != undefined && index < length - 1 && 'mb-10'}`}>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <div className="flex flex-col">
                    <h3 className="leading-tight line-clamp-1 mb-1 text-base lg:text-lg font-semibold text-[#001F3F]">
                        Pedido #{purchase._id.slice(-8)}
                    </h3>
                    <p className="text-[#001F3F] font-medium text-sm lg:text-base opacity-75">
                        Total: <span className="font-semibold opacity-100">MXN {purchase.total.toFixed(2)}</span>
                    </p>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                    <span className="font-medium text-sm lg:text-base opacity-65">
                        {new Date(purchase.createdAt).toLocaleDateString("es-MX", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                    <span className="text-xs opacity-50 mt-1">
                        {new Date(purchase.createdAt).toLocaleTimeString("es-MX", {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>

            <div className="border-t border-[#001F3F]/20 pt-4">

                {purchase.items.map((item, itemIndex) => (
                    <div
                        key={`${item.productId}-${item.colorHex}-${itemIndex}`}
                        className={`flex flex-col sm:flex-row gap-5 sm:items-center ${itemIndex < purchase.items.length - 1 ? 'mb-6' : ''}`}
                    >
                        <div className="relative w-full sm:w-40 h-40 rounded-lg flex items-center justify-center ">
                            <img
                                src={`${GlobalImageProduct.url}${item.colorImage}`}
                                alt={item.productName}
                                loading="lazy"
                                className="w-full h-full object-contain p-4"
                                onError={(e) => {
                                    const img = e.currentTarget;
                                    if (img.src === defaultImage) return;
                                    img.src = defaultImage;
                                }}
                            />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 flex flex-col md:flex-row md:gap-5">

                                <div className="flex-1">
                                    <h4 className="leading-tight line-clamp-2 mb-2 text-base lg:text-lg font-medium text-[#001F3F] ">
                                        {item.productName}
                                    </h4>

                                    <div className="flex flex-col xs:flex-row gap-3 xs:items-center mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#001F3F] text-sm lg:text-base font-medium">
                                                Cantidad:
                                            </span>
                                            <span className="text-[#001F3F] text-sm lg:text-base opacity-75">
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-[#001F3F] text-sm lg:text-base font-medium">
                                                Color:
                                            </span>
                                            <button
                                                className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 transition-all border-gray-200 hover:border-gray-300"
                                                style={{ backgroundColor: item.colorHex || '#ccc' }}
                                                title={item.colorHex || 'Color no especificado'}
                                                aria-label={`Color ${item.colorHex}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="items-start lg:items-end">
                                    <p className="text-[#001F3F] font-semibold text-sm lg:text-base">
                                        MXN {item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-3 pt-4 mt-4 border-t border-[#001F3F]/15">
                                <Link to={`/producto/${item.productSlug}--${item.productId}`}>
                                    <button
                                        className="cursor-pointer flex items-center gap-2 text-[#0C71E4] hover:text-[#0855ae] font-medium text-sm lg:text-base transition-colors"
                                        aria-label={`Ver detalles de ${item.productName}`}
                                    >
                                        <ArrowRight size={16} />
                                        Ver producto
                                    </button>
                                </Link>

                                <span className="text-sm lg:text-base text-[#001F3F] opacity-60">
                                    {item.quantity > 1 ?
                                        `Subtotal: MXN ${(item.price * item.quantity).toFixed(2)}` :
                                        'Única unidad'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-[#001F3F]/25">
                <div className="flex flex-col">
                    <p className="text-xs lg:text-sm text-[#001F3F] opacity-75">
                        {purchase.items.length} {purchase.items.length === 1 ? 'producto' : 'productos'} en este pedido
                    </p>
                    <p className="text-xs lg:text-sm text-[#001F3F] opacity-50 mt-1">
                        ID completo: {purchase._id}
                    </p>
                </div>

                <div className="flex flex-col tems-center gap-1 mb-1">
                    <div className="flex gap-2 items-center">
                        <CreditCard size={16} className="text-[#0C71E4]" />
                        <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                            Pagado con tarjeta
                        </p>
                    </div>
                    {purchase.total > 499 ? (
                        <div className="flex gap-2 items-center">
                            <Truck size={16} className="text-[#0C71E4]" />
                            <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                                Enviado Gratis
                            </p>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Truck size={16} className="text-[#0C71E4]" />
                            <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                                  MXN {(50).toFixed(2)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}