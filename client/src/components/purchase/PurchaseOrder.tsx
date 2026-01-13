import { useAppStore } from "../../stores/useAppStore"

import { CardItemsCardProduct } from "../cart/CardItemsCardProduct"

export const PurchaseOrder = () => {
    const { cart } = useAppStore()

    if (!cart) return

    return (
        <div className=" space-y-5">
            <h3 className="leading-tight line-clamp-1 mb-4 text-xl lg:text-2xl font-semibold text-[#001F3F]">
                2. Resumen de la compra
            </h3>
            <div className="p-6 rounded-xl shadow-sm">
                <div className="space-y-10">
                    {cart.items.map((item, index) => (
                        <div key={index}>
                            <CardItemsCardProduct item={item} index={index} length={cart.items.length} isPurchase={true} />
                            {index < cart.items.length - 1 && <div className="border-t-2 border-[#001F3F]/25" />}
                        </div>
                    ))}

                </div>
            </div>

        </div>

    )
}
