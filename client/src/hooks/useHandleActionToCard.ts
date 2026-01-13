import { toast } from "react-toastify";
import { useAppStore } from "../stores/useAppStore"
import type { TActionCart, TCartAction } from "../types/cart.types"
import { useFormStatus } from "./useFormStatus";
import type { TProduct } from "../types/product.types";

export type TUseHandleActionToCardProps = {
    productId: TProduct['_id'],
    selectedColor: number
}

export const useHandleActionToCard = ({productId, selectedColor} : TUseHandleActionToCardProps ) => {
    const { loading , startLoading, stopLoading } = useFormStatus();
    const { actionToCart } = useAppStore()

    const handleActionToCart = async (action: TCartAction) => {
        startLoading()

        const obj: TActionCart = {
            productId: productId,
            selectedColor
        }

        try {
            await actionToCart(obj, action)

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
        handleActionToCart
    }
}
