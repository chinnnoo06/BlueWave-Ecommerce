import { motion } from "framer-motion"
import { slideInBottom } from "../../helpers/animations/motion";
import { CartItems } from "../../components/cart/CartItems";
import { CartSummary } from "../../components/cart/CartSummary";
import { useAppStore } from "../../stores/useAppStore";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const CartPage = () => {
    const { user, cart, guestCart } = useAppStore()

    const currentCart = user ? cart : guestCart

    return (
        <div id="cart" className="cart-container flex flex-col max-w-[1300px] px-4 mx-auto pb-15 ">

            <motion.nav {...slideInBottom} className="mb-6">
                <h2 className="text-[#001F3F] font-bold leading-tight text-[2rem] lg:text-[2.5rem] relative inline-block">
                    Mi Pedido
                </h2>
            </motion.nav>

            <div className={`flex flex-col lg:flex-row gap-4 justify-center min-h-[50vh] ${currentCart?.items.length ? 'items-start' : 'items-center'}`}>
                {currentCart?.items.length ? (
                    <>
                        <CartItems items={currentCart.items} />

                        <CartSummary cart={currentCart} />
                    </>
                ) : (
                    <>
                        <motion.div {...slideInBottom} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                            <div className="mb-4 p-3 bg-blue-50 rounded-full">
                                <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7 text-[#0855ae]" />
                            </div>
                            <h3 className="font-semibold text-lg lg:text-xl text-[#001F3F] mb-2">
                                Aún no haz agregado un producto al carrito
                            </h3>
                            <p className="opacity-65 text-sm lg:text-base mb-6 max-w-md">
                                !Las compras que realices en BlueWave aparecerán aqui!
                            </p>
                            <Link to="/catalogo/todos/1">
                                <button
                                    type="button"
                                    className="bg-[#0C71E4] hover:bg-[#0855ae] px-3 py-1.5 lg:py-2 rounded-lg font-medium cursor-pointer text-white text-sm lg:text-base transition-colors"
                                >
                                    Ver Productos
                                </button>
                            </Link>

                        </motion.div>
                    </>
                )}
            </div>

        </div>
    )
}
