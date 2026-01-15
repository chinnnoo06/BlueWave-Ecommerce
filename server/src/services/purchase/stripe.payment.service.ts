import { FRONTEND_URL } from "../../config/env";
import { stripe } from "../../config/stripe";
import { TMongoId } from "../../types/mongo/mongo.tpyes";
import { TPurchaseItem } from "../../types/purchase/purchase.types";

export const stripePaymentService = async (userId: TMongoId['_id'], items: TPurchaseItem[], token: string) => {
    const FREE_SHIPPING_MIN = 499
    const SHIPPING_COST = 50

    const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity
    }, 0)

    const needsShipping = subtotal < FREE_SHIPPING_MIN

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
        ...(needsShipping && {
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: SHIPPING_COST * 100,
                            currency: "mxn"
                        },
                        display_name: "Envío estándar",
                        delivery_estimate: {
                            minimum: { unit: "business_day", value: 3 },
                            maximum: { unit: "business_day", value: 7 }
                        }
                    }
                }
            ]
        }),
        success_url: `${FRONTEND_URL}/compra-exitosa?success=${token}`,
        cancel_url: `${FRONTEND_URL}/compra-cancelada?error=${token}`,
        metadata: {
            userId: userId.toString()
        }
    })

    return session
}