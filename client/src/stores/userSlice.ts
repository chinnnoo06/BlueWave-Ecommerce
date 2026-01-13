import type { StateCreator } from 'zustand'
import type { TUser } from '../types/user.types'
import { addFavorite, editAddress, editPassword, editProfileInfo, getFavorites, getProfile, removeAddress, removeFavorite, sendEmailContact } from '../services/user.service'
import type { TContactForm } from '../types/contact.types'
import type { TProfileAddressEditForm, TProfileInfoEditForm, TProfilePasswordEdit } from '../types/profile.types'
import type { TFavorite } from '../types/favorite.types'

export type TUserSlice = {
    user: TUser | null,
    loading: boolean,
    favorites: TFavorite[],
    getProfile: () => Promise<void>,
    sendEmailContact: (data: TContactForm) => Promise<void>,
    editProfileInfo: (data: TProfileInfoEditForm) => Promise<void>,
    editPassword: (data: TProfilePasswordEdit) => Promise<void>,
    editAddress: (data: TProfileAddressEditForm) => Promise<void>,
    removeAddress: () => Promise<void>,
    getFavorites: () => Promise<void>,
    removeFavorite: (idProduct: TFavorite['_id']) => Promise<void>,
    addFavorite: (idProduct: TFavorite['_id']) => Promise<void>,
}

export const createUserSlice: StateCreator<TUserSlice> = (set, get) => ({
    user: null,

    loading: true,

    favorites: [],

    getProfile: async () => {
        const response = await getProfile()

        set({
            user: response,
            loading: false
        })
    },

    sendEmailContact: async (data) => {
        await sendEmailContact(data)
    },

    editProfileInfo: async (data) => {
        const response = await editProfileInfo(data)

        if (response) {
            set({
                user: response
            })
        }
    },

    editPassword: async (data) => {
        await editPassword(data)
    },

    editAddress: async (data) => {
        const response = await editAddress(data)

        if (response) {
            set({
                user: response
            })
        }
    },

    removeAddress: async () => {
        const response = await removeAddress()

        if (response) {
            set({
                user: response
            })
        }
    },

    getFavorites: async () => {
        const user = get().user

        if (user && !user.favorites.length) {
            set({ favorites: [] })
            return
        }

        const response = await getFavorites()

        if (response) {
            set({
                favorites: response
            })
        }
    },

    removeFavorite: async (idProduct) => {
        await removeFavorite(idProduct)

        set((state) => {
            if (!state.user) return state

            return {
                favorites: state.favorites.filter(
                    fav => fav._id !== idProduct
                ),
                user: {
                    ...state.user,
                    favorites: state.user.favorites.filter(
                        favId => favId !== idProduct
                    ),
                }
            }
        })
    },

    addFavorite: async (idProduct) => {
        await addFavorite(idProduct)

        set((state) => {
            if (!state.user) return state

            return {
                user: {
                    ...state.user,
                    favorites:  [...state.user.favorites, idProduct],
                }
            }
        })

    }

})

