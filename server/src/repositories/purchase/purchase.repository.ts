import { Purchase } from "../../models/Purchase"
import { TPurchase } from "../../types/purchase/purchase.types";
import { TUserId } from "../../types/user/user.types"

export const purchaseRepository = {
    async getPurchases(userId: TUserId['_id']) {
        return await Purchase.find({ user: userId });
    },

    async validatePurchaseByStrippeSession(stripeSessionId: string) {
        return Purchase.findOne({
            stripeSessionId: stripeSessionId
        })
    },

    async addPurchase(data: TPurchase) {
        return Purchase.create(data)
    }
}
