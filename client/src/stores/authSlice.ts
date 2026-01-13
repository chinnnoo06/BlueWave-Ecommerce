import type { StateCreator } from 'zustand'
import type { TEmail } from '../types/common.types'
import type { TCodeToRecoverPassword, TDraftUser, TLogin, TLoginResponse, TNewPasswordToRecoverPassword } from '../types/auth.types'
import { createCodeToRecoverPassword, forwardEmail, login, logout, register, saveNewPassword, validateCodeToRecoverPassword, verifySuccessToken } from '../services/auth.service'
import type { TUserSlice } from './userSlice'
import type { TCartSlice } from './cartSlice'

export type TAuthSlice = {
    emailToVerify: TDraftUser['email']
    emailToRecover: TEmail['email']
    createAccount: (user: TDraftUser) => Promise<void>
    forwardEmail: () => Promise<void>
    verifySuccessToken: (token: string) => Promise<void>
    login: (credentials: TLogin) => Promise<TLoginResponse>;
    createCodeToRecoverPassword: (email: TEmail['email']) => Promise<void>
    validateCodeToRecoverPassword: (code: TCodeToRecoverPassword['code']) => Promise<void>
    saveNewPassword: (newPassword: TNewPasswordToRecoverPassword['newPassword']) => Promise<void>
    logout: () => Promise<void>,
}

export const createAuthSlice: StateCreator<TAuthSlice & TUserSlice & TCartSlice, [], [], TAuthSlice> = (set, get) => ({
    emailToVerify: '',

    emailToRecover: '',

    createAccount: async (user) => {
        await register(user)

        set({
            emailToVerify: user.email
        })
    },

    forwardEmail: async () => {
        const email = get().emailToVerify

        if (!email) {
            throw new Error("No hay email para verificar")
        }

        await forwardEmail(email)
    },

    verifySuccessToken: async (token) => {
        await verifySuccessToken(token)
    },

    login: async (credentials) => {
        const response = await login(credentials);

        if (response.status === "unverified") {
            set({
                emailToVerify: response.email
            })
            return response;
        }

        set({
            user: response.user,
            guestCart: null
        })
        return response
    },

    createCodeToRecoverPassword: async (email) => {

        set({
            emailToRecover: email
        })

        await createCodeToRecoverPassword(email)
    },

    validateCodeToRecoverPassword: async (code) => {
        const email = get().emailToRecover

        if (!email) {
            throw new Error("No hay email para recuperar contraseña")
        }


        await validateCodeToRecoverPassword(code, email)
    },

    saveNewPassword: async (newPassword) => {
        const email = get().emailToRecover

        if (!email) {
            throw new Error("No hay email para recuperar contraseña")
        }


        const res = await saveNewPassword(newPassword, email)

        return res.successToken
    },

    logout: async () => {
        await logout()

        set({
            user: null,
            favorites: [],
            cart: null,
            guestCart: null
        })
    },

})

