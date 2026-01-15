import { Types } from "mongoose";

export type TPurchaseItem = {
    productId: Types.ObjectId,
    productName: string,
    productSlug: string,
    colorImage: string
    colorHex: string
    quantity: number;
    price: number;
}

export type TPurchase = {
    user: Types.ObjectId,
    items: TPurchaseItem[],
    total: number,
    stripeSessionId: string,
    paymentIntent: string,
    status?: "paid" | "refunded" | "failed",
}
