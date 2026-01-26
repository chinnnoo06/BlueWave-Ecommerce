import { NextFunction, Request, Response } from "express";
import jwt from 'jwt-simple'
import moment from "moment";
import { SECRET_KEY } from "../config/env";
import { TPayloadToken } from "../services/jwt/token.service";
import { User } from "../models/User";

type TUserRole = 'client' | 'admin'

export function auth(allowedRoles: TUserRole[] = []) {
    return async function (req: Request, res: Response, next: NextFunction) {
        let token = null;

        // Buscar token en cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(403).json({ status: "error", mensaje: "No hay token de autenticación" });
        }

        try {
            const payload = jwt.decode(token, SECRET_KEY) as TPayloadToken;

            // Validar expiración
            if (payload.exp <= moment().unix()) {
                return res.status(401).json({ status: "error", mensaje: "Token expirado" });
            }

            // Validar roles si se pasaron
            if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
                return res.status(403).json({ status: "error", mensaje: "No tienes permisos para acceder" });
            }

            const user = await User.findById(payload._id)

            if (!user) {
                return res.status(401).json({ status: "error", mensaje: "Token inválido" });
            }

            req.user = payload;

            next();
        } catch (err) {
            return res.status(401).json({ status: "error", mensaje: "Token inválido" });
        }
    };
}

export const authOptional = async (req: Request, res: Response, next: NextFunction) => {
    let token = null;

    // 👉 Buscar primero en cookies
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Si no hay token
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        let payload = jwt.decode(token, SECRET_KEY);

        // Validar expiración
        if (payload.exp <= moment().unix()) {
            req.user = null;
            return next();
        }

        const user = await User.findById(payload._id)

        if (!user) {
            return res.status(401).json({ status: "error", mensaje: "Token inválido" });
        }

        req.user = payload;
        next();

    } catch (error) {
        req.user = null;
        next();
    }
}