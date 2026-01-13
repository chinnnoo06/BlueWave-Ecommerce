import { Subscriber } from "../../models/Subscriber"
import { TSubscriber } from "../../types/communication"


export const subscriberRepository = {

    async findByEmail(email: TSubscriber['email']) {
        return Subscriber.findOne({ email })
    },

    async addSubscriber(data: TSubscriber) {
        return Subscriber.create(data)
    },

    async removeSubscriber(email: TSubscriber['email']) {
        return Subscriber.findOneAndDelete({email});
    },
}
