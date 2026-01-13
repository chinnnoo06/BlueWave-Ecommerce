import { Types } from "mongoose";

export type TCartItem = {
    productId: Types.ObjectId,
    quantity: number,
    selectedColor: number,
    price: number,
    discountPercentage: number
}

export type TCart = {
    user: Types.ObjectId;
    items: TCartItem[];
    delivery: number;
    total: number
}

export type TCartLSItem = {
    productId: Types.ObjectId,
    selectedColor: number,
    quantity: number
}

export type TCartLSBody = {
    items: TCartLSItem[]
}