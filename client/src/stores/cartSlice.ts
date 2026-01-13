import type { StateCreator } from 'zustand'
import type { TActionCart, TCart, TCartAction, TCartLs, TGuestCart } from '../types/cart.types'
import type { TUserSlice } from './userSlice'
import { addToCart, clearCart, decreaseToCart, getCart, getCartlS, loadCart, removeToCart } from '../services/cart.service'

export type TCartSlice = {
    cart: TCart | null,
    guestCart: TGuestCart | null,

    getCart: () => void,
    actionToCart: (data: TActionCart, action: TCartAction) => Promise<void>
    clearCart: () => Promise<void>,
    loadCart: () => Promise<void>
    getCartFromLS: () => TCartLs | null,
    saveCartToLS: (cart: TCartLs | null) => void
}

export const createCartSlice: StateCreator<TCartSlice & TUserSlice, [], [], TCartSlice> = (set, get) => ({
    cart: null,

    guestCart: null,

    getCart: async () => {

        const user = get().user

        if (!user) {
            const cartLs = get().getCartFromLS()

            if (!cartLs || !cartLs.items.length) {
                set({ guestCart: null })
                return
            }

            const response = await getCartlS(cartLs.items)

            if (response) {
                set({
                    guestCart: response
                })
            }

            return
        }

        const response = await getCart()

        if (response) {
            set({
                cart: response
            })
        }

    },

    actionToCart: async (data, action) => {

        const user = get().user

        if (!user) {

            let cart = get().getCartFromLS()

            if (!cart) {
                cart = {
                    items: [],
                }
            }

            switch (action) {
                case "add": {
                    const itemExist = cart.items.find(item => item.productId === data.productId && item.selectedColor === data.selectedColor)

                    if (itemExist) {
                        itemExist.quantity += 1

                    } else {
                        cart.items.push({
                            productId: data.productId,
                            selectedColor: data.selectedColor,
                            quantity: 1,
                        })
                    }
                    break
                }

                case "decrease": {
                    const itemInCart = cart.items.find(item => item.productId === data.productId && item.selectedColor === data.selectedColor)

                    if (!itemInCart) break

                    if (itemInCart.quantity > 1) {
                        itemInCart.quantity -= 1
                    } else {
                        cart.items = cart.items.filter(item => item !== itemInCart)
                    }
                    break
                }

                case "remove": {
                    cart.items = cart.items.filter(item => !(item.productId === data.productId && item.selectedColor === data.selectedColor))
                    break
                }
                default: return
            }

            get().saveCartToLS(cart)
            get().getCart()

            return
        }

        switch (action) {
            case "add": {
                const response = await addToCart(data)
                set({
                    cart: response
                })
                break
            }

            case "decrease": {
                const response = await decreaseToCart(data)

                set({
                    cart: response
                })
                break
            }

            case "remove": {
                const response = await removeToCart(data)
                set({
                    cart: response
                })
                break
            }

            default: return
        }
    },

    clearCart: async () => {
        const user = get().user

        if (!user) {
            let cart = get().getCartFromLS()

            cart = {
                items: [],
            }

            get().saveCartToLS(cart)
            get().getCart()

            return
        }

        await clearCart()
        set({
            cart: {
                items: [],
                delivery: 50,
                total: 0
            }
        })
    },

    loadCart: async () => {
        const cartLs = get().getCartFromLS()
        if (!cartLs || !cartLs.items.length) return

        const response = await loadCart(cartLs.items)

        if (response) {
            set({
                cart: response,
                guestCart: null
            })
        }
    },

    getCartFromLS: (): TCartLs | null => {
        const stored = localStorage.getItem("Cart")

        if (!stored) return null

        try {
            return JSON.parse(stored) as TCartLs
        } catch {
            localStorage.removeItem("Cart")
            return null
        }
    },

    saveCartToLS: (cart: TCartLs | null) => {
        if (!cart) {
            localStorage.removeItem("Cart")
        } else {
            localStorage.setItem("Cart", JSON.stringify(cart))
        }
    },
})

