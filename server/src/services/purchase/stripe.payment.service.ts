import { FRONTEND_URL } from "../../config/env";
import { stripe } from "../../config/stripe";
import { TPurchaseItem } from "../../types/purchase/purchase.types";
import { TUserId } from "../../types/user/user.types";

export const stripePaymentService = async (userId: TUserId['_id'], items: TPurchaseItem[], token: string) => {
    
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: items.map(item => ({
            price_data: {
                currency: "mxn",
                product_data: {
                    name: item.productName
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        })),
        success_url: `${FRONTEND_URL}/compra-exitosa?success=${token}`,
        cancel_url: `${FRONTEND_URL}/compra-cancelada?error=${token}`,
        metadata: {
            userId: userId.toString()
        }
    })

    return session
}