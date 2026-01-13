import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TEmail } from "../types/common.types";

export const addSubscriber = async (email: TEmail['email']) => {
    const url = `${Global.url}/api/subscriber/add`
    try {
        const { data } = await axios.post(url, { email }, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al suscriberse"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const removeSubscriber = async (email: TEmail['email']) => {
    const url = `${Global.url}/api/subscriber/remove/${encodeURIComponent(email)}`
    try {
        const { data } = await axios.delete(url, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al desuscriberse"
            );
        }

        throw new Error("Error inesperado");
    }
}