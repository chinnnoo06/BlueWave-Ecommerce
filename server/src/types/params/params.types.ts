import { TCartItem } from "../cart/cart.types";
import { TUser } from "../user/user.types";

export type TUserIdParams = { id: string };

export type TProductIdParams = { id: string };

export type TCategoryIdParams = { id: string };

export type TArticleIdParams = { id: string };

export type TUserUpdateInfo = Omit<TUser, "password" | "address" | "favorites">;

export type TLogin = Pick<TUser, "email" | "password">;

export type TUserUpdatePassword = {
    oldPassword: TUser['password'],
    newPassword: TUser['password']
}

export type TGetProducts = {
    category: TCategoryIdParams['id'],
    page: string
}

export type TSearchProducts = {
    search: string,
    page: string
}

export type TReqToCart = Pick<TCartItem, "productId" | "selectedColor">