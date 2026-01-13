import { motion } from "framer-motion"
import { Truck } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppStore } from "../../stores/useAppStore"
import { useFormStatus } from "../../hooks/useFormStatus"
import { toast } from "react-toastify"
import { useState } from "react"
import { PurchaseProcessModal } from "./PurchaseProcessModal"
import { slideInRight } from "../../helpers/animations/motion"

export const PurchaseSummary = () => {
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { user, cart, validatePurchase } = useAppStore()
    const [showModal, setShowModal] = useState(false);

    if (!cart) return

    const handleValidateCart = async () => {
        startLoading()

        try {
            await validatePurchase()
            setShowModal(true)
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error inesperado"
            );
        } finally {
            stopLoading()
        }
    }

    const existAddress = Boolean(
        user?.address &&
        Object.values(user.address).some(v => v.trim() !== "")
    );


    return (
        <>
            <motion.div {...slideInRight()} className="col2 flex flex-col w-full lg:w-[30%] h-full p-6 lg:mt-11 rounded-xl shadow-sm lg:sticky lg:top-5 lg:h-fit">
                <div className='flex flex-col space-y-6'>

                    <div className="space-y-3">
                        <h3 className="leading-tight line-clamp-2 text-lg lg:text-xl text-[#001F3F] font-semibold">
                            Resumen del pedido
                        </h3>

                        <div className="flex justify-between items-center">
                            <span className="leading-tight line-clamp-2 text-base lg:text-lg text-[#001F3F]">Productos:</span>
                            <span className="font-medium leading-tight line-clamp-2 text-base lg:text-lg text-[#001F3F]">{cart?.items.length}</span>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-[#001F3F]/25">
                            <span className="text-[#001F3F] font-semibold text-sm lg:text-base">Total:</span>
                            <span className="text-[#001F3F] font-medium text-sm lg:text-base">
                                MXN {cart.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <p className="text-xs lg:text-sm opacity-65">
                            * Los precios ya incluyen IVA.
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Truck size={16} className="text-[#0C71E4] " />
                                {cart.total > 499 ? (
                                    <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                                        Envio Gratis
                                    </p>
                                ) : (
                                    <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                                        + MXN {cart.delivery.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </p>
                                )}
                            </div>

                        </div>

                    </div>

                    <div className='flex flex-col gap-3 pt-3 border-t border-[#001F3F]/25'>

                        <button
                            disabled={loading || !existAddress}
                            onClick={() => handleValidateCart()}
                            className='w-full bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base transition-colors disabled:opacity-65 disabled:pointer-events-none'
                        >
                            Procesar Compra
                        </button>

                        <Link
                            to="/pedido"
                            className="no-underline"
                        >
                            <button className="w-full bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm lg:text-base transition-colors">
                                Regresar
                            </button>
                        </Link>
                    </div>

                </div>
            </motion.div>

            <PurchaseProcessModal showModal={showModal} onClose={() => setShowModal(false)} />
        </>

    )
}
