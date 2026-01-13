import { Request, Response } from "express"
import Stripe from "stripe"
import colors from 'colors'
import { Types } from "mongoose"

import { stripe } from "../config/stripe"

import { Purchase } from "../models/Purchase"
import { Cart } from "../models/Cart"
import { STRIPE_WEBHOOK_SECRET } from "../config/env"
import { validateCartInternal } from "../services/cart/cart.service"


export const stripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            STRIPE_WEBHOOK_SECRET
        )
    } catch (err: any) {
        console.error(colors.red.bold("Stripe webhook signature failed:"), err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // solo si strpe confirma que se hizo un pago
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        const userIdRaw = session.metadata?.userId

        if (!userIdRaw) return res.json({ received: true })

        const userId = new Types.ObjectId(userIdRaw)

        if (!userId) {
            console.warn("Stripe session sin userId")
            return res.json({ received: true })
        }

        const alreadyExists = await Purchase.findOne({
            stripeSessionId: session.id
        })

        if (alreadyExists) {
            console.log(colors.red.bold("Evento Stripe duplicado ignorado"))
            return res.json({ received: true })
        }

        const cartData = await validateCartInternal(userId)

        const paymentIntentId =
            typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id

        await Purchase.create({
            user: userId,
            items: cartData.items,     
            total: cartData.total,
            stripeSessionId: session.id,
            paymentIntent: paymentIntentId
        })

        await Cart.findOneAndUpdate(
            { user: userId },
            { items: [], total: 0, delivery: 0 }
        )

        console.log(colors.green.bold("Compra creada desde Stripe"))

    }

    res.json({ received: true })
}