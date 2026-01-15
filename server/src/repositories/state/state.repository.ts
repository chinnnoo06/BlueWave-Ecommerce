import { State } from "../../models/State";

export const stateRepository = {

    async getStates() {
        return  State.find().sort({ name: 1 });
    },


}
