import { User } from "../../models/User"
import { TUser, TUserId } from "../../types/user/user.types"


export const userAuthRepository = {

    async create(data: Partial<TUser>) {
        return User.create(data)
    },

    async setVerificationToken(userId: TUserId['_id'], token: string, expires: Date) {
        return User.findByIdAndUpdate(userId, {
            verificationToken: token,
            verificationTokenExpires: expires
        })
    },

    async userValidateToken(token: string) {
        return User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: new Date() }
        });
    },

    async verifyAccount(userId: TUserId['_id']) {
        return User.findByIdAndUpdate(userId, {
            isVerified: true,
            verificationToken: undefined,
            verificationTokenExpires: undefined
        })
    },

    async setRecoverPasswordCode(userId: TUserId['_id'], code: string, expires: Date) {
        return User.findByIdAndUpdate(userId, {
            codeToRecoverPassword: code,
            verificationCodeExpires: expires,
            canUpdatePassword: false
        })
    },

    async cleanRecoverPasswordCode(userId: TUserId['_id']) {
        return User.findByIdAndUpdate(userId, {
            codeToRecoverPassword: undefined,
            verificationCodeExpires: undefined,
            canUpdatePassword: true
        })
    },

    async saveNewPassword(userId: TUserId['_id'], newPassword: TUser['password']) {
        return User.findByIdAndUpdate(userId, {
            password: newPassword,
            canUpdatePassword: false
        })
    },


}