import { User } from "../../models/User"
import { TUser } from "../../types/user/user.types"

export const userAuthRepository = {
    async create(data: Partial<TUser>) {
        return User.create(data)
    },

    async userValidateToken(token: string) {
        return User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: new Date() }
        });
    }
}