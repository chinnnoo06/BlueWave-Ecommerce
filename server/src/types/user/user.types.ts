import { Types } from "mongoose";

export type TAddress = {
    street: string,
    number: string,
    city: string,
    state: string,
    postalCode: string
}

export type TUser = {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    favorites?: Types.ObjectId[],
    address?: TAddress,
    searches?: string[],
    role: "client" | "admin",
    isVerified: boolean,
    verificationToken?: string,
    verificationTokenExpires?: Date,
    codeToRecoverPassword?: string,
    verificationCodeExpires?: Date,
    canUpdatePassword?: boolean
}

export type TUserLogged = Pick<TUser, "role"> & { _id: Types.ObjectId }

