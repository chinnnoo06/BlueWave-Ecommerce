import { TUser } from "../user/user.types"

export type TSubscriber = {
    email: TUser['email']
}

export type TContact = {
    name: string,
    surname: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
}



