import { Types } from "mongoose"
import colors from "colors"
import Stripe from "stripe"
import { clearCartService, validateCartInternalService } from "../cart/cart.service"
import { addPurchaseService, validatePurchaseByStrippeSessionService } from "../purchase/purchase.service"
import { TPurchase } from "../../types/purchase/purchase.types"

export const stripeWebhookService = async (event: Stripe.Event) => {
    if (event.type !== "checkout.session.completed") return

    const session = event.data.object as Stripe.Checkout.Session

    const userIdRaw = session.metadata?.userId

    if (!userIdRaw) {
        console.warn("Stripe session sin userId")
        return
    }

    const userId = new Types.ObjectId(userIdRaw)

    const alreadyExists = await validatePurchaseByStrippeSessionService(session.id)

    if (alreadyExists) {
        console.log(colors.red.bold("Evento Stripe duplicado ignorado"))
        return
    }

    const cartData = await validateCartInternalService(userId)

    const paymentIntentId =
        typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id

    const newPurchase: TPurchase = {
        user: userId,
        items: cartData.items,
        total: cartData.total,
        stripeSessionId: session.id,
        paymentIntent: paymentIntentId
    }
    
    await addPurchaseService(newPurchase)

    await clearCartService(userId)

    console.log(colors.green.bold("Compra creada desde Stripe"))
}