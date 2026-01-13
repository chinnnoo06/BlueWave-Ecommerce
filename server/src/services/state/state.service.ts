import { stateRepository } from "../../repositories/state/state.repository"

export const getStatesService = async () => {
    const states = await stateRepository.getStates()

    if (states.length === 0) throw new Error('No hay estados')

    return states
}
