import { Schema, Types, model } from "mongoose";
import { TPurchase, TPurchaseItem } from "../types/purchase/purchase.types";

const PurchaseItemSchema = new Schema<TPurchaseItem>({
    productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    colorImage: {
        type: String,
        required: true
    },

    colorHex: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true // precio FINAL pagado
    }
}, { _id: false });

const PurchaseSchema = new Schema<TPurchase>({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },

    items: {
        type: [PurchaseItemSchema],
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    stripeSessionId: {
        type: String,
        required: true,
        unique: true // evita compras duplicadas si Stripe reintenta
    },

    paymentIntent: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["paid", "refunded", "failed"],
        default: "paid"
    }

}, { timestamps: true });

export const Purchase = model("Purchase", PurchaseSchema);
