import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TPurchase, TPurchaseSummary } from "../types/purchase.types";
import { PurchaseSchema, PurchaseSummarySchema } from "../schemas/purchase.schema";
import z from "zod";

export const getPurchases = async (): Promise<TPurchase[]> => {
    const url = `${Global.url}/api/purchase/get`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(PurchaseSchema).safeParse(data.purchases);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener compras"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const validatePurchase = async (): Promise<TPurchaseSummary> => {
    const url = `${Global.url}/api/purchase/validate`

    try {
        const { data } = await axios.post(url, {}, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = PurchaseSummarySchema.safeParse(data.cartSuccess);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al validar carrito"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const createStripeCheckout = async (): Promise<string> => {
    const url = `${Global.url}/api/purchase/checkout`

    try {
        const { data } = await axios.post(url, {}, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("No se pudo crear sesión de pago");
        }

        return data.url;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error iniciar sesión de pago"
            );
        }

        throw new Error("Error inesperado");
    }
}