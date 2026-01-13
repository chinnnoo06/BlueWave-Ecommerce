import type { StateCreator } from 'zustand'
import type { TPurchase, TPurchaseSummary } from '../types/purchase.types'
import { createStripeCheckout, getPurchases, validatePurchase } from '../services/purchase.service'
import type { TCartSlice } from './cartSlice'

export type TPurchaseSlice = {
    purchases: TPurchase[],
    purchaseSummary: TPurchaseSummary | null
    getPurchases: () => Promise<void>,
    validatePurchase: () => Promise<void>,
    createStripeCheckout: () => Promise<void>
}

export const createPurchaseSlice: StateCreator<TPurchaseSlice & TCartSlice, [], [], TPurchaseSlice> = (set, get) => ({

    purchases: [],

    purchaseSummary: null,

    getPurchases: async () => {
        const response = await getPurchases()

        if (response) {
            set({
                purchases: response
            })
        }
    },

    validatePurchase: async () => {
        try {
            const response = await validatePurchase()

            set({
                purchaseSummary: response
            })

        } finally {
            get().getCart()
        }
    },

    createStripeCheckout: async () => {
        const url = await createStripeCheckout()
        window.location.href = url // ← redirige a Stripe
    }

})

