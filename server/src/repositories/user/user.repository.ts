import { User } from "../../models/User"
import { TMongoId } from "../../types/mongo/mongo.tpyes"
import { TUserUpdateInfo } from "../../types/params/params.types"
import { TAddress, TUser, TUserLogged } from "../../types/user/user.types"

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

    async updateUserInfo(userId: TMongoId['_id'], data: TUserUpdateInfo) {
        return User.findByIdAndUpdate(userId, data, { new: true }).select({ password: 0 })
    },

    async updateUserPassword(userId: TMongoId['_id'], newPwd: TUser['password']) {
        return User.findByIdAndUpdate(userId, { password: newPwd }, { new: true }).select({ password: 1 })
    },

    async updateAddress(userId: TMongoId['_id'], data: TAddress) {
        return User.findByIdAndUpdate(userId, { address: data }, { new: true }).select({ password: 0 })
    },

    async removeAddress(userId: TMongoId['_id'], data: TAddress) {
        return User.findByIdAndUpdate(userId, { address: data }, { new: true }).select({ password: 0 })
    },

    async addFavorite(userId: TMongoId['_id'], idProduct: TMongoId['_id']) {
        return User.findByIdAndUpdate(userId, { $addToSet: { favorites: idProduct } }, { new: true }).select({ password: 0 })
    },

    async removeFavorite(userId: TMongoId['_id'], idProduct: TMongoId['_id']) {
        return User.findByIdAndUpdate(userId, { $pull: { favorites: idProduct } }, { new: true }).select({ password: 0 })
    },

    async getUserSearches(userId: TMongoId['_id'], search: string) {
        User.findByIdAndUpdate(userId, {
            $pull: { searches: search }
        });
    },

    async updateUserSearches(userId: TMongoId['_id'], search: string) {
        return User.findByIdAndUpdate(userId, {
            $push: {
                searches: {
                    $each: [search],
                    $slice: -5
                }
            }
        }, { new: true });
    },

}
