import { User } from "../../models/User"
import { TMongoId } from "../../types/mongo/mongo.tpyes"
import { TUserUpdateInfo } from "../../types/params/params.types"
import { TAddress, TUser, TUserLogged } from "../../types/user/user.types"
import { Document } from "mongoose"

export type TUserDocument = Document & TUser

export const userRepository = {

    async save(user: TUserDocument) {
        return user.save()
    },

    async findByEmail(email: TUser["email"]) {
        return User.findOne({ email })
    },

    async findById(id: TUserLogged['_id'], includePassword: boolean = false) {
        if (includePassword) {
            return User.findById(id)
        }

        return User.findById(id).select({ password: 0 })
    }
}
