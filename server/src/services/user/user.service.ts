import { User } from "../../models/User"
import { TUser, TUserLogged } from "../../types/user/user.types"

export const validateUserExistByEmail = async (email: TUser['email']) => {
  return await User.findOne({ email: email })
}

export const validateUserExistById = async (id: TUserLogged['_id'], includePassword: boolean = false) => {
  if (includePassword) {
    return await User.findById(id)
  } else {
    return await User.findById(id).select({ password: 0 })
  }
}