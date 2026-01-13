import { Product } from "../../models/Product"
import { State } from "../../models/State";
import { TProductId } from "../../types/product/product.types"
import { TUser } from "../../types/user/user.types"

export const stateRepository = {

    async getStates() {
        return  State.find().sort({ name: 1 });
    },


}
