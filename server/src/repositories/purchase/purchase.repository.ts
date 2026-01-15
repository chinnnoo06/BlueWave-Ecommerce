import { Purchase } from "../../models/Purchase"
import { TMongoId } from "../../types/mongo/mongo.tpyes";
import { TPurchase } from "../../types/purchase/purchase.types";

export const purchaseRepository = {
    async getPurchases(userId: TMongoId['_id']) {
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
