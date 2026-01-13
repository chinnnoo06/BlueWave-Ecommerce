import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import colors from 'colors'

import { TAddress, TUser, TUserLogged } from "../types/user/user.types";
import { TLogin, TUserIdParams, TUserUpdateInfo, TUserUpdatePassword } from "../types/params/params.types";
import { TProductId } from "../types/product/product.types";
import { TContact } from "../types/communication";
import { SECRET_KEY } from "../config/env";

import { successToken } from "../services/jwt/tokenUrl.service";
import { createToken } from "../services/jwt/token.service";
import { createCodeToRecoverPasswordService, forwardEmailService, loginService, registerUserService, saveNewPasswordService, validateCodeToRecoverPasswordService, verifyAccountService } from "../services/user/user.auth.service";
import { addFavoriteService, contactEmailService, getFavoritesProductsService, getProfileService, removeAddressService, removeFavoriteService, updateAddressService, updateUserInfoService, updateUserPasswordService } from "../services/user/user.service";


export const registerUser = async (req: Request<{}, {}, TUser>, res: Response) => {
    const params = req.body;

    try {
        const user = await registerUserService(params)

        return res.status(200).json({
            status: "success",
            user,
            mensaje: "Usuario registrado con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al guardar en la bd"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

type TSendEmailReq = {
    email: TUser['email'];
};

export const forwardEmail = async (req: Request<{}, {}, TSendEmailReq>, res: Response) => {
    const email = req.body.email

    try {
        await forwardEmailService(email)

        return res.status(200).json({
            status: "success",
            mensaje: "Correo reeviado con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al reenviar correo de verificación"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error al reenviar correo de verificación"
        });
    }
}

export const verifyAccount = async (req: Request<TUserIdParams, {}, {}>, res: Response) => {
    const { token } = req.query;

    try {
        if (typeof token !== "string") {
            throw new Error("Token inválido")
        }

        const userId = await verifyAccountService(token)

        const success = successToken(userId)

        return res.redirect(
            `${process.env.FRONTEND_URL}/iniciar-sesion?successVerified=${success}`
        )

    } catch (error) {
        console.log(colors.red.bold("Error al verificar cuenta"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error al verificar cuenta"
        });
    }
}

export const verifySuccessToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const payload = jwt.verify(token, SECRET_KEY!) as any;

        if (payload.type !== "email-verified") {
            return res.status(400).json({ ok: false });
        }

        return res.status(200).json({ ok: true });

    } catch {
        return res.status(400).json({ ok: false });
    }
};

export const login = async (req: Request<{}, {}, TLogin>, res: Response) => {
    const params = req.body;

    try {
        const result = await loginService(params)

        if (result.status === "unverified") {
            return res.status(200).json({
                status: "unverified",
                email: result.email
            });
        }

        const userrLogged: TUserLogged = {
            _id: result.user._id,
            role: result.user.role
        }

        const token = createToken(userrLogged);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status: "success",
            mensaje: "Login con exito",
            user: result.user
        });

    } catch (error) {
        console.log(colors.red.bold("Error al iniciar sesión"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    return res.status(200).json({
        status: "success",
        mensaje: "Sesión cerrada correctamente"
    });
}

export const createCodeToRecoverPassword = async (req: Request<{}, {}, TSendEmailReq>, res: Response) => {
    const email = req.body.email

    try {
        await createCodeToRecoverPasswordService(email)

        return res.status(200).json({
            status: "success",
            mensaje: "Correo enviado con exito"
        });
    } catch (error) {
        console.log(colors.red.bold("Error al enviar correo de verificación para restablecer contraseña"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error al enviar correo de verificación para restablecer contraseña"
        });
    }
}

type TValidateCodeToRecoverPassword = {
    email: TUser['email'],
    code: string
}

export const validateCodeToRecoverPassword = async (req: Request<{}, {}, TValidateCodeToRecoverPassword>, res: Response) => {
    let email = req.body.email
    let code = req.body.code

    try {
        await validateCodeToRecoverPasswordService(email, code)

        return res.status(200).json({
            status: "success",
            mensaje: "Código para restablecer contraseña correcto"
        });

    } catch (error) {
        console.log(colors.red.bold("Error al verificar código de recuperación de contraseña"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error al verificar código de recuperación de contraseña"
        });
    }
}

type TSaveNewPassword = {
    email: TUser['email'],
    newPassword: TUser['password']
}

export const saveNewPassword = async (req: Request<{}, {}, TSaveNewPassword>, res: Response) => {
    const email = req.body.email
    const newPassword = req.body.newPassword

    try {
        const userId = await saveNewPasswordService(email, newPassword)

        const success = successToken(userId)

        return res.status(200).json({
            status: "success",
            successToken: success
        });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar contraseña"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error al actualizar contraseña"
        });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(200).json({
            status: "success",
            user: null
        });
    }

    const id = req.user._id

    try {
        const user = await getProfileService(id)

        return res.status(200).json({
            status: "success",
            user
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener perfil"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}


export const updateUserInfo = async (req: Request<{}, {}, TUserUpdateInfo>, res: Response) => {
    const params = req.body
    const id = req.user._id

    try {
        const user = await updateUserInfoService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Información del usuario actualizada correctamente",
            user
        });

    } catch (error) {
        console.log(colors.red.bold("Error al actualizar la información del usuairo"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const updateUserPassword = async (req: Request<{}, {}, TUserUpdatePassword>, res: Response) => {
    const params = req.body
    const id = req.user._id

    try {
        await updateUserPasswordService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Contraseña actualizada correctamente",
        });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar la contraseña del usuairo"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const updateAddress = async (req: Request<{}, {}, TAddress>, res: Response) => {
    const params = req.body
    const id = req.user._id

    try {
        const user = await updateAddressService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Dirección actualizada correctamente",
            user
        });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar la dirección"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const removeAddress = async (req: Request, res: Response) => {
    const id = req.user._id

    try {
        const user = await removeAddressService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Dirección actualizada correctamente",
            user
        });

    } catch (error) {
        console.log(colors.red.bold("Error al actualizar la dirección"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const addFavorite = async (req: Request<{}, {}, TProductId>, res: Response) => {
    const params = req.body
    const id = req.user._id

    try {
        await addFavoriteService(id, params._id)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto agregado a favoritos correctamente"
        });

    } catch (error) {
        console.log(colors.red.bold("Error al agregar a favoritos"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const removeFavorite = async (req: Request<{}, {}, TProductId>, res: Response) => {
    const params = req.body
    const id = req.user._id

    try {
        await removeFavoriteService(id, params._id)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto eliminado de favoritos correctamente"
        });

    } catch (error) {
        console.log(colors.red.bold("Error al eliminar de favoritos"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const getFavoritesProducts = async (req: Request, res: Response) => {
    const id = req.user._id

    try {
        const products = await getFavoritesProductsService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Productos de favoritos obtenidos correctamente",
            products
        })

    } catch (error) {
        console.log(colors.red.bold("Error al obtener productos favoritos"))
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}


export const contactEmail = async (req: Request<{}, {}, TContact>, res: Response) => {
    let params = req.body

    try {
        await contactEmailService(params)

        return res.status(200).json({
            status: "success",
            mensaje: "Correo enviado correctamente"
        });

    } catch (error) {
        console.log(colors.red.bold("Error al enviar correo de contacto"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}