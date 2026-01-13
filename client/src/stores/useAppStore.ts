import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createUserSlice, type TUserSlice } from './userSlice'
import { createProductSlice, type TProductSlice } from './productSlice'
import { createCategorySlice, type TCategorySlice } from './categorySlice'
import { createArticleSlice, type TArticleSlice } from './articleSlice'
import { createAuthSlice, type TAuthSlice } from './authSlice'
import { createSubscriberSlice, type TSubscriberSlice } from './subscriberSlice'
import { createGeoSlice, type TGeoSlice } from './geoStore'
import { createCartSlice, type TCartSlice } from './cartSlice'
import { createPurchaseSlice, type TPurchaseSlice } from './purchaseSlice'

export const useAppStore = create<TAuthSlice & TUserSlice & TProductSlice & TCategorySlice & TArticleSlice 
& TSubscriberSlice & TGeoSlice & TCartSlice & TPurchaseSlice>()(devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createUserSlice(...a),
    ...createProductSlice(...a),
    ...createCategorySlice(...a),
    ...createArticleSlice(...a),
    ...createSubscriberSlice(...a),
    ...createGeoSlice(...a),
    ...createCartSlice(...a),
    ...createPurchaseSlice(...a),
})))