import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import crypto from "crypto";
import jwt from "jsonwebtoken";
import colors from 'colors'

import { User } from "../models/User";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

import { TAddress, TUser, TUserLogged } from "../types/user/user.types";
import { TUserIdParams } from "../types/params/params.types";
import { TProductId } from "../types/product/product.types";
import { TContact } from "../types/communication";

import { validateUserExistByEmail, validateUserExistById } from "../services/user/user.service";
import { sendCodeToRecoverPasswordEmail, sendContactEmail, sendVerificationEmail } from "../services/email/email.service";
import { successToken } from "../services/jwt/tokenUrl.service";
import { SECRET_KEY } from "../config/env";
import { createToken } from "../services/jwt/token.service";
import { generate6DigitCode } from "../helpers";
import { validateProductExist } from "../services/product/product.service";

export const registerUser = async (req: Request<{}, {}, TUser>, res: Response) => {
    let params = req.body;

    try {
        if (await validateUserExistByEmail(params.email)) {
            throw new Error('Ese correo ya esta registrado')
        }

        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        // Generar token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const newUser = new User({
            ...params,
            verificationToken,
            verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60), // 1 hora
        })
        const createUser = await newUser.save()
        const newCartUser = new Cart({
            user: createUser._id,
            items: [],
            total: 0
        })

        await newCartUser.save()

        await sendVerificationEmail(createUser.email, verificationToken);

        return res.status(200).json({
            status: "success",
            user: createUser,
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
    let email = req.body.email

    try {
        const userExists = await validateUserExistByEmail(email)

        if (!userExists || userExists.isVerified) {
            throw new Error('No esta registrada esta cuenta o ya fue verificada')
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        userExists.verificationToken = verificationToken,
            userExists.verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60)

        userExists.save()

        await sendVerificationEmail(email, verificationToken);

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
    let { token } = req.query;

    try {
        const userExists = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: new Date() }
        });

        if (!userExists) {
            return res.status(400).json({
                status: "error",
                mensaje: "Token inválido o expirado"
            });
        }

        userExists.isVerified = true;
        userExists.verificationToken = undefined;
        userExists.verificationTokenExpires = undefined;

        await userExists.save();

        const success = successToken(userExists._id)

        // Redirigir al login del frontend
        return res.redirect(
            `${process.env.FRONTEND_URL}/iniciar-sesion?successVerified=${success}`
        );

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


type TLogin = Pick<TUser, "email" | "password">;

export const login = async (req: Request<{}, {}, TLogin>, res: Response) => {
    let params = req.body;

    try {
        const userExists = await validateUserExistByEmail(params.email)

        if (!userExists) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        let pwd = bcrypt.compareSync(params.password, userExists.password)

        if (!pwd) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        if (!userExists.isVerified) {
            return res.status(200).json({
                status: "unverified",
                email: userExists.email
            });
        }

        const userrLogged: TUserLogged = {
            _id: userExists._id,
            role: userExists.role
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
            user: userExists
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
    let email = req.body.email

    try {
        const userExists = await validateUserExistByEmail(email)

        if (!userExists) {
            throw new Error('No esta registrada esta cuenta')
        }

        const verificationCode = generate6DigitCode()
        const hashedCode = await bcrypt.hash(verificationCode, 10);

        userExists.codeToRecoverPassword = hashedCode,
            userExists.verificationCodeExpires = new Date(Date.now() + 1000 * 60 * 15)
        userExists.canUpdatePassword = false

        userExists.save()

        await sendCodeToRecoverPasswordEmail(email, verificationCode);

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
        const userExists = await validateUserExistByEmail(email)

        if (!userExists) {
            throw new Error('No esta registrada esta cuenta')
        }

        if (!userExists.verificationCodeExpires || userExists.verificationCodeExpires <= new Date()) {
            throw new Error('El código ha expirado')
        }

        let compareCode = bcrypt.compareSync(code, userExists.codeToRecoverPassword)

        if (!compareCode) {
            throw new Error('Código incorrecto')
        }

        userExists.codeToRecoverPassword = undefined;
        userExists.verificationCodeExpires = undefined;
        userExists.canUpdatePassword = true

        await userExists.save();

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
    let email = req.body.email
    let newPassword = req.body.newPassword

    try {
        const userExists = await validateUserExistByEmail(email)

        if (!userExists) {
            throw new Error('No esta registrada esta cuenta')
        }

        if (!userExists.canUpdatePassword) {
            throw new Error('No autorizado para cambiar la contraseña')
        }

        let verifyPwd = bcrypt.compareSync(newPassword, userExists.password)

        if (verifyPwd) {
            throw new Error('La contraseña nueva no puede ser igual que la anterior')
        }

        let pwd = await bcrypt.hash(newPassword, 10);

        userExists.password = pwd;
        userExists.canUpdatePassword = false

        await userExists.save();

        const success = successToken(userExists._id)

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

    let id = req.user._id

    try {
        const user = await validateUserExistById(id)

        if (!user) {
            throw new Error('Usuario no encontrado')
        }

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

type TUserUpdateInfo = Omit<TUser, "password" | "address" | "favorites">;

export const updateUserInfo = async (req: Request<{}, {}, TUserUpdateInfo>, res: Response) => {
    let params = req.body
    let id = req.user._id

    try {
        const user = await User.findByIdAndUpdate(id, params, { new: true }).select({ password: 0 })

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

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

type TUserUpdatePassword = {
    oldPassword: TUser['password'],
    newPassword: TUser['password']
}

export const updateUserPassword = async (req: Request<{}, {}, TUserUpdatePassword>, res: Response) => {
    let params = req.body
    let id = req.user._id

    try {
        const userExists = await validateUserExistById(id, true)

        if (!userExists) {
            throw new Error("Usuario no encontrado");
        }

        let pwd = bcrypt.compareSync(params.oldPassword, userExists.password)

        if (!pwd) {
            throw new Error('Contraseña Incorrecta')
        }

        let verifyNewPwd = bcrypt.compareSync(params.newPassword, userExists.password)

        if (verifyNewPwd) {
            throw new Error('La contraseña nueva no puede ser igual que la anterior')
        }


        let newPwd = await bcrypt.hash(params.newPassword, 10);
        await User.findByIdAndUpdate(id, { password: newPwd }, { new: true }).select({ password: 1 })

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
    let params = req.body
    let id = req.user._id

    try {
        const user = await User.findByIdAndUpdate(id, { address: params }, { new: true }).select({ password: 0 })

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

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
    let id = req.user._id

    try {
        const cleanedAddress = {
            street: "",
            number: "",
            state: "",
            city: "",
            postalCode: "",
        }
        const user = await User.findByIdAndUpdate(id, { address: cleanedAddress }, { new: true }).select({ password: 0 })

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

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
    let params = req.body
    let id = req.user._id

    try {

        const product = await validateProductExist(params._id)

        if (!product) {
            throw new Error("Producto no encontrado")
        }

        const user = await User.findByIdAndUpdate(id, { $addToSet: { favorites: params._id } }, { new: true }).select({ password: 0 })

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

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
    let params = req.body
    let id = req.user._id

    try {
        const userExists = await validateUserExistById(id)

        if (!userExists) {
            throw new Error("Usuario no encontrado");
        }

        const isFavorite = userExists.favorites.includes(params._id);

        if (!isFavorite) {
            throw new Error("El producto no está en favoritos");
        }


        const user = await User.findByIdAndUpdate(id, { $pull: { favorites: params._id } }, { new: true }).select({ password: 0 })

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

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

export const getFavoriteProducts = async (req: Request, res: Response) => {
    const id = req.user._id

    try {
        const user = await validateUserExistById(id)

        if (!user) {
            throw new Error("Usuario no encontrado")
        }

        const favoritesIds = user.favorites

        const products = await Product.aggregate([
            {
                $match: {
                    _id: { $in: favoritesIds }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    category: "$category.name"
                }
            },
            {
                $project: {
                    description: 0
                }
            }
        ])

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
        await sendContactEmail(params)
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