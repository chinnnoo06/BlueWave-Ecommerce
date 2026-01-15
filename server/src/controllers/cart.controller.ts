import { NextFunction, Request, Response } from "express";
import colors from 'colors'

import { TCartLSBody } from "../types/cart/cart.types";

import { TReqToCart } from "../types/params/params.types";
import { addToCartService, clearCartService, decreaseToCartService, getCartService, getLsCartService, loadLSCardService, removeItemCartService } from "../services/cart/cart.service";

export const addToCart = async (req: Request<{}, {}, TReqToCart>, res: Response, next: NextFunction) => {
    const params = req.body
    const id = req.user._id

    try {
        const cartResponse = await addToCartService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto agregado a carrito correctamente",
            cart: cartResponse
        });
    } catch (error) {
        console.log(colors.red.bold("Error al agregar a carrito"));
        next(error);
    }
}

export const decreaseToCart = async (req: Request<{}, {}, TReqToCart>, res: Response, next: NextFunction) => {
    const params = req.body
    const id = req.user._id

    try {
        const cartResponse = await decreaseToCartService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Cantidad del producto en el carrito restada correctamente",
            cart: cartResponse

        });
    } catch (error) {
        console.log(colors.red.bold("Error al restar cantidad de un producto en el carrito"));
        next(error);
    }
}

export const removeItemCart = async (req: Request<{}, {}, TReqToCart>, res: Response, next: NextFunction) => {
    const params = req.body
    const id = req.user._id

    try {
        const cartResponse = await removeItemCartService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Producto eliminado del carrito correctamente",
            cart: cartResponse
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar producto del carrito"));
        next(error);
    }
}

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id

    try {
        const cart = await clearCartService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito vaciado correctamente",
            cart

        });
    } catch (error) {
        console.log(colors.red.bold("Error al vaciar el carrito"));
        next(error);
    }
}


export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id

    try {
        const cartResponse = await getCartService(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito obtenido correctamente",
            cart: cartResponse
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener el carrito"));
        next(error);
    }
}

export const getLSCard = async (req: Request<{}, {}, TCartLSBody>, res: Response, next: NextFunction) => {
    const params = req.body;

    try {
        const responseItems = await getLsCartService(params)

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito cargado desde Local Storage",
            cart: {
                items: responseItems
            }
        });

    } catch (error) {
        console.log(colors.red.bold("Error al cargar carrito LS"));
        next(error);
    }
}

export const loadLSCard = async (req: Request<{}, {}, TCartLSBody>, res: Response, next: NextFunction) => {
    const params = req.body;
    const id = req.user._id

    try {
        const cartResponse = await loadLSCardService(id, params)

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito cargado del Local Storage correctamente",
            cart: cartResponse
        });
    } catch (error) {
        console.log(colors.red.bold("Error al cargar carrito LS"));
        next(error);
    }
}