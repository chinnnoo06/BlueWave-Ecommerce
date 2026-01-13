import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TActionCart, TCart, TCartLs, TGuestCart } from "../types/cart.types";
import { CartSchema, GuestCartSchema } from "../schemas/cart.schema";

export const getCart = async (): Promise<TCart> => {
    const url = `${Global.url}/api/cart/get`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = CartSchema.safeParse(data.cart);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener carrito"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const getCartlS = async (items: TCartLs['items']): Promise<TGuestCart> => {
    const url = `${Global.url}/api/cart/get-ls`

    try {
        const { data } = await axios.post(url, { items }, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = GuestCartSchema.safeParse(data.cart);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener carrito del LS"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const addToCart = async (dataAction: TActionCart): Promise<TCart> => {
    const url = `${Global.url}/api/cart/add`
   
    try {
        const { data } = await axios.patch(url, dataAction, {
            withCredentials: true,
        });


        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = CartSchema.safeParse(data.cart);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al agregar al carrito"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const decreaseToCart = async (dataAction: TActionCart): Promise<TCart> => {
    const url = `${Global.url}/api/cart/decrease`

    try {
        const { data } = await axios.patch(url, dataAction, {
            withCredentials: true,
        });

        console.log(data)

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = CartSchema.safeParse(data.cart);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al eliminar del carrito"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const removeToCart = async (dataAction: TActionCart): Promise<TCart> => {
    const url = `${Global.url}/api/cart/remove`

    try {
        const { data } = await axios.patch(url, dataAction, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = CartSchema.safeParse(data.cart);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al eliminar del carrito"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const clearCart = async () => {
    const url = `${Global.url}/api/cart/clear`

    try {
        const { data } = await axios.patch(url, {}, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al limpiar el carrito"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const loadCart = async (items: TCartLs['items']): Promise<TCart> => {
    const url = `${Global.url}/api/cart/load`

    try {
        const { data } = await axios.put(url, { items }, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = CartSchema.safeParse(data.cart);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al cargar el carrito del LS a la bd"
            );
        }

        throw new Error("Error inesperado");
    }
}