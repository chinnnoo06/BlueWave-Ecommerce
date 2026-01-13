import type { StateCreator } from 'zustand'
import type { TState } from '../types/geo.types'
import { getStates } from '../services/geo.service'

export type TGeoSlice = {
    states: TState[],
    getStates: () => Promise<void>
}

export const createGeoSlice: StateCreator<TGeoSlice> = (set) => ({
    states: [],

    getStates: async () => {
        const response = await getStates()

        if (response) {
            set({
                states: response
            })
        }
    }
})

