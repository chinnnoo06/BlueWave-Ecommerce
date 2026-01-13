import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import z from "zod";
import type { TState } from "../types/geo.types";
import { StateSchema } from "../schemas/geo.schema";

export const getStates = async (): Promise<TState[]> => {
    const url = `${Global.url}/api/state/get`

    try {

        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(StateSchema).safeParse(data.states);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener estados de méxico"
            );
        }

        throw new Error(`${error}`);
    }
}