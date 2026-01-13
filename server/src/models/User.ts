
import { Schema, Types, model } from "mongoose";
import { TAddress, TUser } from "../types/user/user.types";

const AddressSchema = new Schema<TAddress>({
    street: { type: String, default: "" },
    number: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    postalCode: { type: String, default: "" }
}, { _id: false });


const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [
        {
            type: Types.ObjectId,
            ref: "Product",
            required: false
        }
    ],
    address: {
        type: AddressSchema,
        default: {}
    },
    searches: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ["client", "admin"],
        default: "client"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    },
    codeToRecoverPassword: {
        type: String,
    },
    verificationCodeExpires: {
        type: Date,
    },
    canUpdatePassword: {
        type: Boolean,
        default: false
    }
})

export const User = model<TUser>("User", UserSchema, "users");