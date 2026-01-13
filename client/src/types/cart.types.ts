import type z from "zod";
import type { CartItemSchema, CartSchema, GuestCartSchema } from "../schemas/cart.schema";
import type { TProduct } from "./product.types";

export type TCartItem = z.infer<typeof CartItemSchema>

export type TGuestCart =  z.infer<typeof GuestCartSchema>

export type TCart = z.infer<typeof CartSchema>

export type TCartLsItem = {
    productId: string;
    selectedColor: number;
    quantity: number;
}

export type TCartLs = {
    items: TCartLsItem[];
}

export type TActionCart = {
    productId: TProduct['_id'],
    selectedColor: number,
}

export type TCartAction = "add" | "decrease" | "remove" 