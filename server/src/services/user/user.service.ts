import bcrypt from 'bcrypt'

import { userRepository } from "../../repositories/user/user.repository"
import { TUserUpdateInfo, TUserUpdatePassword } from "../../types/params/params.types"
import { TAddress } from "../../types/user/user.types"
import { productRepository } from '../../repositories/product/product.repository'
import { TContact } from '../../types/communication'
import { sendContactEmail } from '../email/email.service'
import { HttpError } from '../../helpers'
import { TMongoId } from '../../types/mongo/mongo.tpyes'

export const getProfileService = async (idUser: TMongoId['_id']) => {
  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  return user
}

export const updateUserInfoService = async (idUser: TMongoId['_id'], data: TUserUpdateInfo) => {
  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  user.name = data.name
  user.surname = data.surname
  user.email = data.email
  user.phone = data.phone

  await userRepository.save(user)

  return user
}

export const updateUserPasswordService = async (idUser: TMongoId['_id'], data: TUserUpdatePassword) => {
  const user = await userRepository.findById(idUser, true)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");

  const pwd = bcrypt.compareSync(data.oldPassword, user.password)

  if (!pwd) throw new HttpError(401, 'Contraseña Incorrecta')

  const verifyNewPwd = bcrypt.compareSync(data.newPassword, user.password)

  if (verifyNewPwd) throw new HttpError(400, 'La contraseña nueva no puede ser igual que la anterior')

  const newPwd = await bcrypt.hash(data.newPassword, 10);

  user.password = newPwd

  await userRepository.save(user)
}

export const updateAddressService = async (idUser: TMongoId['_id'], data: TAddress) => {
  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  user.address = data


}

export const removeAddressService = async (idUser: TMongoId['_id']) => {
  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  const cleanedAddress: TAddress = {
    street: "",
    number: "",
    state: "",
    city: "",
    postalCode: "",
  }

  user.address = cleanedAddress

  await userRepository.save(user)

  return user
}

export const addFavoriteService = async (idUser: TMongoId['_id'], idProduct: TMongoId['_id']) => {
  const productExist = await productRepository.findById(idProduct)

  if (!productExist) throw new HttpError(404, "Producto no encontrado");

  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  const alredyExist = user.favorites.some(fav => fav.toString() === idProduct.toString())

  if (alredyExist) return

  user.favorites.push(idProduct)

  await userRepository.save(user)
}

export const removeFavoriteService = async (idUser: TMongoId['_id'], idProduct: TMongoId['_id']) => {
  const productExist = await productRepository.findById(idProduct)

  if (!productExist) throw new HttpError(404, "Producto no encontrado");

  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta")

  user.favorites = user.favorites.filter(fav => fav.toString() !== idProduct.toString())

  await userRepository.save(user)
}

export const getFavoritesProductsService = async (idUser: TMongoId['_id']) => {
  const user = await userRepository.findById(idUser)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");

  const favoritesIds = user.favorites

  const products = await productRepository.getFavoriteProducts(favoritesIds)

  return products
}

export const contactEmailService = async (data: TContact) => {
  await sendContactEmail(data)
}

export const getUserSearchesService = async (userId: TMongoId['_id'], search: string) => {
  const user = await userRepository.findById(userId)

  if (!user) throw new HttpError(404, "No esta registrada esta cuenta");

  const alredyExist = user.searches.some( searchUser => searchUser === search )

  if (alredyExist) return

  user.searches.push(search)
  user.searches = user.searches.slice(-5)

  await userRepository.save(user)

  return user.searches
}