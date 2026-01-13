import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TContactForm } from "../types/contact.types";
import { UserSchema } from "../schemas/user.schema";
import type { TUser } from "../types/user.types";
import type { TProfileAddressEditForm, TProfileInfoEditForm, TProfilePasswordEdit } from "../types/profile.types";
import { FavoriteSchema } from "../schemas/favorite.schema";
import type { TFavorite } from "../types/favorite.types";
import z from "zod";

export const getProfile = async (): Promise<TUser | null> => {
    const url = `${Global.url}/api/user/profile`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        if (data.user === null) {
            return null;
        }

        const result = UserSchema.safeParse(data.user);

        if (!result.success) {
            throw new Error("Usuario inválido");
        }

        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener perfril"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const sendEmailContact = async (dataContact: TContactForm) => {
    const url = `${Global.url}/api/user/contact-email`

    try {
        const { data } = await axios.post(url, dataContact, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error enviar correo de contacto"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const editProfileInfo = async (dataProfile: TProfileInfoEditForm) => {
    const url = `${Global.url}/api/user/update-info`

    try {
        const { data } = await axios.patch(url, dataProfile, {
            withCredentials: true,
        });

        const result = UserSchema.safeParse(data.user);

        if (!result.success) {
            throw new Error("Usuario inválido");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al editar información del perfil"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const editPassword = async (dataPassword: TProfilePasswordEdit) => {
    const url = `${Global.url}/api/user/update-password`

    try {
        const { data } = await axios.patch(url, dataPassword, {
            withCredentials: true,
        });

        console.log(data)

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al actualizar contraseña"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const editAddress = async (dataAddress: TProfileAddressEditForm) => {
    const url = `${Global.url}/api/user/update-address`

    try {
        const { data } = await axios.patch(url, dataAddress, {
            withCredentials: true,
        });

        const result = UserSchema.safeParse(data.user);

        if (!result.success) {
            throw new Error("Usuario inválido");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al editar dirección"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const removeAddress = async () => {
    const url = `${Global.url}/api/user/remove-address`

    try {
        const { data } = await axios.patch(url, {}, {
            withCredentials: true,
        });

        const result = UserSchema.safeParse(data.user);

        if (!result.success) {
            throw new Error("Usuario inválido");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al editar dirección"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const getFavorites = async (): Promise<TFavorite[]> => {
    const url = `${Global.url}/api/user/get-favorites`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(FavoriteSchema).safeParse(data.products);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener favoritos"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const removeFavorite = async (idProduct : TFavorite['_id']) => {
    const url = `${Global.url}/api/user/remove-favorites`

    try {
        const { data } = await axios.patch(url, {_id: idProduct}, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al eliminar producto de favoritos"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const addFavorite = async (idProduct : TFavorite['_id']) => {
    const url = `${Global.url}/api/user/add-favorites`

    try {
        const { data } = await axios.patch(url, {_id: idProduct}, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al agregar producto de favoritos"
            );
        }

        throw new Error("Error inesperado");
    }
}
