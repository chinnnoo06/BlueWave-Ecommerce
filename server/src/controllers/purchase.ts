import { Request, Response } from "express"
import colors from 'colors'

import { Purchase } from "../models/Purchase";
import { stripe } from "../config/stripe"
import { validateCartInternal } from "../services/cart/cart.service";
import { successToken } from "../services/jwt/tokenUrl.service";
import { FRONTEND_URL } from "../config/env";

export const validateCard = async (req: Request, res: Response) => {
    let id = req.user._id

    try {
        const data = await validateCartInternal(id)

        return res.status(200).json({
            status: "success",
            message: "Compra validada correctamente",
            cartSuccess: data
        });

    } catch (error) {
        console.log(colors.red.bold("Error al validar carrito compra"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}


export const checkOut = async (req: Request, res: Response) => {
    let id = req.user._id
    try {

        const cartData = await validateCartInternal(id)

        const token = successToken(id)

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: cartData.items.map(item => ({
                price_data: {
                    currency: "mxn",
                    product_data: {
                        name: item.productName
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity: item.quantity
            })),
            success_url: `${FRONTEND_URL}/compra-exitosa?success=${token}`,
            cancel_url: `${FRONTEND_URL}/compra-cancelada?error=${token}`,
            metadata: {
                userId: id.toString()
            }
        })

        res.status(200).json({
            status: "success",
            url: session.url
        })

    } catch (error) {
        console.log(colors.red.bold("Error desconocido al hacer checkout"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const getPurchases = async (req: Request, res: Response) => {
    let id = req.user._id

    try {
        const purchases = await Purchase.find({ user: id });

        if (!purchases) {
            throw new Error("No hay compras del usuario")
        }

        return res.status(200).json({
            status: "success",
            message: "Compras obtenidas correctamente",
            purchases
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener compras"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}