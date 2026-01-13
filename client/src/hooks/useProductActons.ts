import { useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import type { TCartItem, TCartLsItem } from "../types/cart.types"
import type { TProduct } from "../types/product.types"
import { useFormStatus } from "./useFormStatus"
import { toast } from "react-toastify"
import { useHandleActionToCard } from "./useHandleActionToCard"

export type TUseProductActonsProps = {
    product: TProduct,
    selectedColor: number
}

export const useProductActons = ({product, selectedColor} : TUseProductActonsProps) => {

    const { user, cart, guestCart, addFavorite, removeFavorite } = useAppStore()
    const { loading, startLoading, stopLoading } = useFormStatus();
    const { loading: loadingAction, handleActionToCart } = useHandleActionToCard({ productId: product._id, selectedColor})
    const [showModal, setShowModal] = useState(false);

    let isFavorite: boolean = false
    let itemInCart: TCartItem | null = null

    let itemInCartLs: TCartLsItem | null = null

    if (user && cart) {
        isFavorite = user?.favorites.includes(product._id)
        itemInCart = cart?.items.find(item => item.productId === product._id && item.selectedColor === selectedColor) ?? null
    } else {
        itemInCartLs = guestCart?.items.find(item => item.productId === product._id && item.selectedColor === selectedColor) ?? null
    }

    const currentItemInCart = user ? itemInCart : itemInCartLs

    const handleFavorite = async () => {
        if (!user) {
            setShowModal(true)
            return;
        }

        startLoading()

        try {
            if (isFavorite) {
                await removeFavorite(product._id)

                toast.success('Producto eliminado de favoritos correctamente', {
                    className: 'toast-success',
                });
            } else {
                await addFavorite(product._id)

                toast.success('Producto agregado a favoritos correctamente', {
                    className: 'toast-success',
                });
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error inesperado"
            );
        } finally {
            stopLoading()
        }
    }


    return {
        loading,
        loadingAction,
        isFavorite,
        currentItemInCart,
        showModal,
        actions: {
            setShowModal,
            handleFavorite,
            handleActionToCart
        }

    }
}
