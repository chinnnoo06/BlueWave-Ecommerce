import { HttpError } from "../../helpers";
import { stateRepository } from "../../repositories/state/state.repository"

export const getStatesService = async () => {
    const states = await stateRepository.getStates()

    if (states.length === 0) throw new HttpError(404, "No hay estados");

    return states
}
