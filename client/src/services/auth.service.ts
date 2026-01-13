import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TCodeToRecoverPassword, TDraftUser, TLogin, TLoginResponse, TNewPasswordToRecoverPassword } from "../types/auth.types";
import { LoginResponseSchema } from "../schemas/auth.schema";
import type { TEmail } from "../types/common.types";

export const login = async (user: TLogin): Promise<TLoginResponse> => {
    const url = `${Global.url}/api/user/login`

    try {

        const { data } = await axios.post(url, user, {
            withCredentials: true,
        });

        const result = LoginResponseSchema.safeParse(data);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al iniciar sesión"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const register = async (user: TDraftUser) => {
    const url = `${Global.url}/api/user/register`

    try {

        const { data } = await axios.post(url, user, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al registrarte"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const forwardEmail = async (email: TDraftUser['email']) => {
    const url = `${Global.url}/api/user/forward-email`

    try {

        const { data } = await axios.post(url, { email }, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al reenviar correo de verificación"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const verifySuccessToken = async (successToken: string) => {
    const url = `${Global.url}/api/user/verify-success`

    try {
        const { data } = await axios.post(url, { token: successToken }, {
            withCredentials: true,
        });

        return data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al verificar token"
            );
        }

        throw new Error("Error inesperado");
    }
}


export const createCodeToRecoverPassword = async (email: TEmail['email']) => {
    const url = `${Global.url}/api/user/create-code-to-recover-password`

    try {

        const { data } = await axios.post(url, { email }, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al enviar correo de verificación para restablecer contraseña"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const validateCodeToRecoverPassword = async (code: TCodeToRecoverPassword['code'], email: TEmail['email']) => {
    const url = `${Global.url}/api/user/verify-code-to-recover-password`

    try {

        const { data } = await axios.post(url, { code, email }, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al verificar el código para restablecer contraseña"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const saveNewPassword = async (newPassword: TNewPasswordToRecoverPassword['newPassword'], email: TEmail['email']) => {
    const url = `${Global.url}/api/user/save-new-password`

    try {
        const { data } = await axios.post(url, { newPassword, email }, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al guardar la nueva contraseña contraseñaa"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const logout = async () => {
    const url = `${Global.url}/api/user/logout`

    try {

        const { data } = await axios.post(url, {}, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al cerrar sesión"
            );
        }

        throw new Error("Error inesperado");
    }
}