import { TCartItem } from "../cart/cart.types";
import { TMongoIdParams } from "../mongo/mongo.tpyes";
import { TUser } from "../user/user.types";

export type TUserUpdateInfo = Pick<TUser, "name" | "surname" | "email" | "phone">;

export type TLogin = Pick<TUser, "email" | "password">;

export type TUserUpdatePassword = {
    oldPassword: TUser['password'],
    newPassword: TUser['password']
}

export type TGetProducts = {
    category: TMongoIdParams['id'],
    page: string
}

export type TSearchProducts = {
    search: string,
    page: string
}

export type TReqToCart = Pick<TCartItem, "productId" | "selectedColor">