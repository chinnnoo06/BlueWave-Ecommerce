
import { Schema, Types, model } from "mongoose";
import { TCart, TCartItem } from "../types/cart/cart.types";


const CartItemSchema = new Schema<TCartItem>({
    productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    selectedColor: {
        type: Number,
        required: false
    },

    price: {
        type: Number,
        required: true
    },

    discountPercentage: {
        type: Number,
        required: true,
        default: 0
    }
}, { _id: false });

export const CartSchema = new Schema<TCart>({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // 1 carrito por usuario
    },

    items: {
        type: [CartItemSchema],
        default: []
    },

    delivery: {
        type: Number,
        default: 50,
    },

    total: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });


export const Cart = model<TCart>("Cart", CartSchema, "carts");