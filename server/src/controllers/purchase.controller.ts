import { NextFunction, Request, Response } from "express"
import colors from 'colors'

import { checkOutService, getPurchasesService, validateCardService } from "../services/purchase/purchase.service";

export const validateCard = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id

    try {
        const data = await validateCardService(id)

        return res.status(200).json({
            status: "success",
            message: "Compra validada correctamente",
            cartSuccess: data
        });
    } catch (error) {
        console.log(colors.red.bold("Error al validar carrito compra"));
        next(error);
    }
}


export const checkOut = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id

    try {
        const session = await checkOutService(id)

        res.status(200).json({
            status: "success",
            url: session.url
        })

    } catch (error) {
        console.log(colors.red.bold("Error desconocido al hacer checkout"));
        next(error);
    }
}

export const getPurchases = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id

    try {
        const purchases = await getPurchasesService(id)

        return res.status(200).json({
            status: "success",
            message: "Compras obtenidas correctamente",
            purchases
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener compras"));
        next(error);
    }
}