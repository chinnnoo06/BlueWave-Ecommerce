import { HttpError } from "../../helpers";
import { purchaseRepository } from "../../repositories/purchase/purchase.repository";
import { TMongoId } from "../../types/mongo/mongo.tpyes";
import { TPurchase } from "../../types/purchase/purchase.types";
import { validateCartInternalService } from "../cart/cart.service";
import { successToken } from "../jwt/tokenUrl.service";
import { stripePaymentService } from "./stripe.payment.service";

export const validateCardService = async (userId: TMongoId['_id']) => {
    const cart = await validateCartInternalService(userId)

    return cart
}

export const checkOutService = async (userId: TMongoId['_id']) => {
    const cart = await validateCartInternalService(userId)

    const token = successToken(userId)

    const session = await stripePaymentService(userId, cart.items, token)

    return session
}

export const getPurchasesService = async (userId: TMongoId['_id']) => {
    const purchases = purchaseRepository.getPurchases(userId)

    if (!purchases) throw new HttpError(404, "No hay compras del usuario")

    return purchases
}

export const validatePurchaseByStrippeSessionService = async (stripeSessionId: string) => {
    return await purchaseRepository.validatePurchaseByStrippeSession(stripeSessionId)
}

export const addPurchaseService = async (data: TPurchase) => {
    await purchaseRepository.addPurchase(data)
}