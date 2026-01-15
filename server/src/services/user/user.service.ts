import bcrypt from 'bcrypt'

import { userRepository } from "../../repositories/user/user.repository"
import { TUserUpdateInfo, TUserUpdatePassword } from "../../types/params/params.types"
import { TAddress } from "../../types/user/user.types"
import { productRepository } from '../../repositories/product/product.repository'
import { TContact } from '../../types/communication'
import { sendContactEmail } from '../email/email.service'
import { HttpError } from '../../helpers'
import { TMongoId } from '../../types/mongo/mongo.tpyes'

export const getProfileService = async (id: TMongoId['_id']) => {
  const user = await userRepository.findById(id)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  return user
}

export const updateUserInfoService = async (id: TMongoId['_id'], data: TUserUpdateInfo) => {
  const user = await userRepository.updateUserInfo(id, data)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");

  return user
}

export const updateUserPasswordService = async (id: TMongoId['_id'], data: TUserUpdatePassword) => {
  const userExists = await userRepository.findById(id)

  if (!userExists) throw new HttpError(404, "No esta registrada esta cuenta");

  const pwd = bcrypt.compareSync(data.oldPassword, userExists.password)

  if (!pwd) throw new HttpError(401, 'Contraseña Incorrecta')

  const verifyNewPwd = bcrypt.compareSync(data.newPassword, userExists.password)

  if (verifyNewPwd) throw new HttpError(400, 'La contraseña nueva no puede ser igual que la anterior')

  const newPwd = await bcrypt.hash(data.newPassword, 10);

  await userRepository.updateUserPassword(id, newPwd)
}

export const updateAddressService = async (id: TMongoId['_id'], data: TAddress) => {
  const user = await userRepository.updateAddress(id, data)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");

  return user
}

export const removeAddressService = async (id: TMongoId['_id']) => {
  const cleanedAddress: TAddress = {
    street: "",
    number: "",
    state: "",
    city: "",
    postalCode: "",
  }

  const user = await userRepository.removeAddress(id, cleanedAddress)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");

  return user
}

export const addFavoriteService = async (id: TMongoId['_id'], idProduct: TMongoId['_id']) => {
  const productExist = await productRepository.findById(idProduct)

  if (!productExist) throw new HttpError(404, "Producto no encontrado");

  const user = await userRepository.addFavorite(id, idProduct)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");
}

export const removeFavoriteService = async (id: TMongoId['_id'], idProduct: TMongoId['_id']) => {
  const productExist = await productRepository.findById(idProduct)

  if (!productExist) throw new HttpError(404, "Producto no encontrado");

  const user = await userRepository.removeFavorite(id, idProduct)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");
}

export const getFavoritesProductsService = async (id: TMongoId['_id']) => {
  const userExists = await userRepository.findById(id)

  if (!userExists) throw new HttpError(404, "No esta registrada esta cuenta");

  const favoritesIds = userExists.favorites

  const products = await productRepository.getFavoriteProducts(favoritesIds)

  return products
}

export const contactEmailService = async (data: TContact) => {
  await sendContactEmail(data)
}

export const getUserSearchesService = async (userId: TMongoId['_id'], search: string) => {
  await userRepository.getUserSearches(userId, search)
} 

export const updateUserSearchesService = async (userId: TMongoId['_id'], search: string) => {
  const userUpdated = await userRepository.updateUserSearches(userId, search)

  return userUpdated
} 