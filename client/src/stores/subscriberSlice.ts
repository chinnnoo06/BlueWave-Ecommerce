import type { StateCreator } from 'zustand'
import type { TSubscriber } from '../types/subscriber.types'
import type { TEmail } from '../types/common.types'
import { addSubscriber, removeSubscriber } from '../services/subscriber.service'

export type TSubscriberSlice = {
    subscribers: TSubscriber[],
    addSubscriber: (email: TEmail['email']) => Promise<void>,
    removeSubscriber: (email: TEmail['email']) => Promise<void>
}

export const createSubscriberSlice: StateCreator<TSubscriberSlice> = () => ({
    subscribers: [],

    addSubscriber: async (email) => {
        await addSubscriber(email)
    },

    removeSubscriber: async (email) => {
        await removeSubscriber(email)
    },

})

