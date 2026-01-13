import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { TCart, TGuestCart } from "../../types/cart.types"
import { Trash2, Truck } from "lucide-react"
import { useAppStore } from "../../stores/useAppStore"
import { useFormStatus } from "../../hooks/useFormStatus"
import { toast } from "react-toastify"
import { ModalToLogin } from "../ui/ModalToLogin"
import { useState } from "react"
import { slideInRight } from "../../helpers/animations/motion"

type TCartSummaryProps = {
  cart: TCart | TGuestCart
}

export const CartSummary = ({ cart }: TCartSummaryProps) => {
  const { loading, startLoading, stopLoading } = useFormStatus();
  const { user, clearCart } = useAppStore()
  const [showModal, setShowModal] = useState(false);

  const isFullCart = (cart: TCart | TGuestCart): cart is TCart => {
    return 'total' in cart && 'delivery' in cart
  }

  let totalLS = 0;

  if (!isFullCart(cart)) {
    totalLS = cart.items.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
  }

  const total = isFullCart(cart) ? cart.total : totalLS

  const delivery = isFullCart(cart) ? cart.delivery : total > 499 ? 0 : 50

  const handleClearCart = async () => {
    startLoading()

    try {
      await clearCart()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error inesperado"
      );
    } finally {
      stopLoading()
    }
  }


  return (
    <>
      <motion.div {...slideInRight()} className="col2 flex flex-col w-full lg:w-[30%] h-full p-6 rounded-xl shadow-sm lg:sticky lg:top-5 lg:h-fit">
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
                MXN {total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <p className="text-xs lg:text-sm opacity-65">
              * Los precios ya incluyen IVA.
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Truck size={16} className="text-[#0C71E4] " />
                {total > 499 ? (
                  <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                    Envio Gratis
                  </p>
                ) : (
                  <p className="text-xs lg:text-sm text-[#001F3F] font-medium">
                    + MXN {delivery.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                onClick={() => handleClearCart()}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-xs lg:text-sm transition-colors"
                aria-label="Eliminar producto del carrito"
              >
                <Trash2 size={16} />
                Vaciar Carrito
              </button>
            </div>

          </div>

          <div className='flex flex-col gap-3 pt-3 border-t border-[#001F3F]/25'>
            {user ? (
              <Link to='/confirmar-compra' state={{ isValid: true }}>
                <button
                  className='w-full bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base transition-colors'
                >
                  Realizar Pedido
                </button>
              </Link>

            ) : (
              <button
                onClick={() => setShowModal(true)}
                className='w-full bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base transition-colors'
              >
                Realizar Pedido
              </button>
            )}

            <Link
              to="/catalogo/todos/1"
              className="no-underline"
            >
              <button className="w-full bg-transparent text-[#0C71E4] hover:bg-[#0C71E4] hover:text-white border border-[#0C71E4] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-sm lg:text-base transition-colors">
                Comprar Más
              </button>
            </Link>
          </div>

        </div>
      </motion.div>


      <ModalToLogin showModal={showModal} onClose={() => setShowModal(false)} />
    </>

  )
}