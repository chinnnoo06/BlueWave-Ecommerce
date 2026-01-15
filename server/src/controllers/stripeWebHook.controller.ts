import { Request, Response } from "express"
import Stripe from "stripe"
import colors from 'colors'

import { stripe } from "../config/stripe"

import { STRIPE_WEBHOOK_SECRET } from "../config/env"
import { stripeWebhookService } from "../services/stripeWebHook/stripeWebHook.service"

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

    try {
        await stripeWebhookService(event)
    } catch (error) {
        console.error(colors.red.bold("Stripe webhook service error:"), error)
        return res.status(500).json({ received: true })
    }

    res.json({ received: true })
}