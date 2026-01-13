import { User } from "../../models/User"
import { TUserUpdateInfo } from "../../types/params/params.types"
import { TProductId } from "../../types/product/product.types"
import { TAddress, TUser, TUserId, TUserLogged } from "../../types/user/user.types"

export const userRepository = {

    async findByEmail(email: TUser["email"]) {
        return User.findOne({ email })
    },

    async findById(id: TUserLogged['_id'], includePassword: boolean = false) {
        if (includePassword) {
            return User.findById(id)
        }

        return User.findById(id).select({ password: 0 })
    },

    async updateUserInfo(userId: TUserId['_id'], data: TUserUpdateInfo) {
        return User.findByIdAndUpdate(userId, data, { new: true }).select({ password: 0 })
    },

    async updateUserPassword(userId: TUserId['_id'], newPwd: TUser['password']) {
        return User.findByIdAndUpdate(userId, { password: newPwd }, { new: true }).select({ password: 1 })
    },

    async updateAddress(userId: TUserId['_id'], data: TAddress) {
        return User.findByIdAndUpdate(userId, { address: data }, { new: true }).select({ password: 0 })
    },

    async removeAddress(userId: TUserId['_id'], data: TAddress) {
        return User.findByIdAndUpdate(userId, { address: data }, { new: true }).select({ password: 0 })
    },

    async addFavorite(userId: TUserId['_id'], idProduct: TProductId['_id']) {
        return User.findByIdAndUpdate(userId, { $addToSet: { favorites: idProduct } }, { new: true }).select({ password: 0 })
    },

    async removeFavorite(userId: TUserId['_id'], idProduct: TProductId['_id']) {
        return User.findByIdAndUpdate(userId, { $pull: { favorites: idProduct } }, { new: true }).select({ password: 0 })
    },

}
