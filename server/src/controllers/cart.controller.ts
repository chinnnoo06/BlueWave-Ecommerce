import { Request, Response } from "express";
import colors from 'colors'

import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

import { TCartItem, TCartLSBody } from "../types/cart/cart.types";

import { validateProductExist } from "../services/product/product.service";
import { buildCartResponse } from "../services/cart/cart.mapper";

export const pruebaCart = async (req: Request, res: Response) => {
    return res.status(200).json({
        mensaje: "Holeadessa",
    });
}

type TProductInCart = {
    exist: boolean,
    quantity: number,
    price: number
}

type TReqToCart = Pick<TCartItem, "productId" | "selectedColor">

export const addToCart = async (req: Request<{}, {}, TReqToCart>, res: Response) => {
    let params = req.body
    let id = req.user._id

    try {
        const productExist = await validateProductExist(params.productId)
        const maxIndex = productExist.colors.length - 1;

        if (!productExist || params.selectedColor > maxIndex) {
            throw new Error("Producto o color no válido");
        }

        const actualCart = await Cart.findOne({ user: id });

        if (!actualCart) {
            throw new Error("Cart no encontrado");
        }

        const productInCart: TProductInCart = { exist: false, quantity: 1, price: 0 }

        for (let i = 0; i < actualCart.items.length; i++) {

            if (actualCart.items[i].productId.equals(params.productId) && actualCart.items[i].selectedColor === params.selectedColor) {
                productInCart.exist = true
                productInCart.quantity = actualCart.items[i].quantity
                productInCart.price = actualCart.items[i].price
            }
        }

        let newTotal: number = 0
        let delivery: number

        if (productInCart.exist) {
            newTotal = actualCart.total + productInCart.price

            delivery = newTotal > 499 ? 0 : 50

            await Cart.findOneAndUpdate(
                { user: id },
                {
                    $inc: { "items.$[item].quantity": 1 },
                    $set: { delivery, total: newTotal }
                },
                {
                    arrayFilters: [
                        {
                            "item.productId": params.productId,
                            "item.selectedColor": params.selectedColor
                        }
                    ],
                    new: true
                }
            );

        } else {

            let priceReal: number = 0

            let discountPercentage: number = 0

            if (productExist.promotion.active) {
                priceReal = (productExist.price) - (productExist.price * (productExist.promotion.discountPercentage / 100))
                discountPercentage = productExist.promotion.discountPercentage
            } else {
                priceReal = productExist.price
            }

            newTotal = actualCart.total + priceReal

            delivery = newTotal > 499 ? 0 : 50

            const cartItem: TCartItem = {
                productId: params.productId,
                selectedColor: params.selectedColor,
                price: priceReal,
                discountPercentage: discountPercentage,
                quantity: 1
            };

            console.log(cartItem)

            await Cart.findOneAndUpdate(
                { user: id },
                { $push: { items: cartItem }, $set: { delivery: delivery, total: newTotal } },
                { new: true });
        }

        const cartResponse = await buildCartResponse(actualCart._id.toString());

        return res.status(200).json({
            status: "success",
            mensaje: "Producto agregado a carrito correctamente",
            cart: cartResponse
        });
    } catch (error) {
        console.log(colors.red.bold("Error al agregar a carrito"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const decreaseToCart = async (req: Request<{}, {}, TReqToCart>, res: Response) => {
    let params = req.body
    let id = req.user._id

    try {
        const productExist = await validateProductExist(params.productId)
        const maxIndex = productExist.colors.length - 1;

        if (!productExist || params.selectedColor > maxIndex) {
            throw new Error("Producto o color no válido");
        }

        const actualCart = await Cart.findOne({ user: id });

        if (!actualCart) {
            throw new Error("Cart no encontrado");
        }

        const productInCart: TProductInCart = {
            exist: false,
            quantity: 1,
            price: 0
        }

        for (let i = 0; i < actualCart.items.length; i++) {
            if (actualCart.items[i].productId.equals(params.productId) && actualCart.items[i].selectedColor === params.selectedColor) {
                productInCart.exist = true
                productInCart.quantity = actualCart.items[i].quantity
                productInCart.price = actualCart.items[i].price
            }
        }

        let newTotal: number = actualCart.total - productInCart.price
        let delivery = newTotal > 499 ? 0 : 50

        const setUpdate: { delivery: number, total: number; } = { delivery: delivery, total: newTotal };

        if (productInCart.exist) {
            if (productInCart.quantity > 1) {
                await Cart.findOneAndUpdate(
                    { user: id },
                    {
                        $inc: { "items.$[item].quantity": -1 },
                        $set: { delivery, total: newTotal }
                    },
                    {
                        arrayFilters: [
                            {
                                "item.productId": params.productId,
                                "item.selectedColor": params.selectedColor
                            }
                        ],
                        new: true
                    }
                );
            } else {
                await Cart.findOneAndUpdate(
                    { user: id },
                    {
                        $pull: {
                            items: {
                                productId: params.productId,
                                selectedColor: params.selectedColor
                            }
                        },
                        $set: setUpdate
                    },
                    { new: true }
                );
            }
        } else {
            throw new Error("Producto en cart no encontrado");
        }

        const cartResponse = await buildCartResponse(actualCart._id.toString());

        return res.status(200).json({
            status: "success",
            mensaje: "Cantidad del producto en el carrito restada correctamente",
            cart: cartResponse

        });
    } catch (error) {
        console.log(colors.red.bold("Error al restar cantidad de un producto en el carrito"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const removeItem = async (req: Request<{}, {}, TReqToCart>, res: Response) => {
    let params = req.body
    let id = req.user._id

    try {
        const productExist = await validateProductExist(params.productId)
        const maxIndex = productExist.colors.length - 1;

        if (!productExist || params.selectedColor > maxIndex) {
            throw new Error("Producto o color no válido");
        }

        const actualCart = await Cart.findOne({ user: id });

        if (!actualCart) {
            throw new Error("Cart no encontrado");
        }

        const productInCart: TProductInCart = {
            exist: false,
            quantity: 1,
            price: 0
        }

        for (let i = 0; i < actualCart.items.length; i++) {
            if (actualCart.items[i].productId.equals(params.productId) && actualCart.items[i].selectedColor === params.selectedColor) {
                productInCart.exist = true
                productInCart.quantity = actualCart.items[i].quantity
                productInCart.price = actualCart.items[i].price
            }
        }

        let newTotal: number = actualCart.total - (productInCart.price * productInCart.quantity)
        let delivery = newTotal > 499 ? 0 : 50

        const setUpdate: { delivery: number, total: number; } = { delivery: delivery, total: newTotal };

        if (productInCart.exist) {
            await Cart.findOneAndUpdate(
                { user: id },
                {
                    $pull: {
                        items: {
                            productId: params.productId,
                            selectedColor: params.selectedColor
                        }
                    },
                    $set: setUpdate
                },
                { new: true }
            );
        } else {
            throw new Error("Producto en cart no encontrado");
        }

        const cartResponse = await buildCartResponse(actualCart._id.toString());

        return res.status(200).json({
            status: "success",
            mensaje: "Producto eliminado del carrito correctamente",
            cart: cartResponse
        });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar producto del carrito"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const clearCart = async (req: Request, res: Response) => {
    let id = req.user._id

    try {
        const cart = await Cart.findOneAndUpdate({ user: id }, {
            items: [],
            delivery: 50,
            total: 0
        }, { new: true });

        if (!cart) {
            throw new Error("Cart no encontrado");
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito vaciado correctamente",
            cart

        });
    } catch (error) {
        console.log(colors.red.bold("Error al vaciar el carrito"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}


export const getCart = async (req: Request, res: Response) => {
    let id = req.user._id

    try {
        const cart = await Cart.findOne({ user: id })
            .populate({
                path: "items.productId",
                select: "name colors"
            })
            .lean();

        if (!cart) {
            throw new Error("Cart no encontrado");
        }

        const cartResponse = await buildCartResponse(cart._id.toString());

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito obtenido correctamente",
            cart: cartResponse
        });

    } catch (error) {
        console.log(colors.red.bold("Error al obtener el carrito"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const getLSCard = async (req: Request<{}, {}, TCartLSBody>, res: Response) => {
    const { items } = req.body;

    try {
        if (!items || !Array.isArray(items)) {
            throw new Error("Items inválidos");
        }

        const responseItems = [];

        for (const item of items) {
            const productExist = await Product.findById(item.productId)
                .populate({
                    path: "category",
                    select: "name"
                })
                .lean();

            if (!productExist) {
                throw new Error("Producto no encontrado");
            }

            const maxIndex = productExist.colors.length - 1;
            if (item.selectedColor > maxIndex) {
                throw new Error("Color inválido");
            }

            let realPrice: number = 0
            let discountPercentage: number = 0

            if (productExist.promotion.active) {
                realPrice = (productExist.price) - (productExist.price * (productExist.promotion.discountPercentage / 100))
                discountPercentage = productExist.promotion.discountPercentage
            } else {
                realPrice = productExist.price
            }


            responseItems.push({
                productId: productExist._id,
                productName: productExist.name,
                category: (productExist.category as any)?.name ?? "",
                colorImage: productExist.colors[item.selectedColor].images[0],
                quantity: item.quantity,
                selectedColor: item.selectedColor,
                selectedColorHex: productExist.colors[item.selectedColor].hex,
                discountPercentage: productExist.promotion.discountPercentage,
                price: realPrice
            });
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito cargado desde Local Storage",
            cart: {
                items: responseItems
            }
        });

    } catch (error) {
        console.log(colors.red.bold("Error al cargar carrito LS"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const loadLSCard = async (req: Request<{}, {}, TCartLSBody>, res: Response) => {
    const { items } = req.body;
    const id = req.user._id

    try {
        if (!items || !Array.isArray(items)) {
            throw new Error("Items inválidos");
        }

        let cart = await Cart.findOne({ user: id })

        if (!cart) {
            cart = new Cart({
                user: id,
                items: [],
                delivery: 0,
                total: 0
            })
        }

        // añadir items actuales
        const itemsMap = new Map<string, TCartItem>()

        for (const item of cart.items) {
            const key = `${item.productId.toString()}-${item.selectedColor}`
            itemsMap.set(key, item)
        }

        for (const item of items) {
            const productExist = await validateProductExist(item.productId);

            const maxIndex = productExist.colors.length - 1;
            if (item.selectedColor > maxIndex) {
                throw new Error("Color inválido");
            }

            let realPrice: number = 0
            let discountPercentage: number = 0

            if (productExist.promotion.active) {
                realPrice = (productExist.price) - (productExist.price * (productExist.promotion.discountPercentage / 100))
                discountPercentage = productExist.promotion.discountPercentage
            } else {
                realPrice = productExist.price
            }

            const key = `${productExist._id.toString()}-${item.selectedColor}`

            if (itemsMap.has(key)) {
                // si ya existe → sumar cantidad
                const existingItem = itemsMap.get(key)!
                existingItem.quantity += item.quantity
                existingItem.price = realPrice
                existingItem.discountPercentage = discountPercentage
            } else {
                // ➕ Nuevo item
                itemsMap.set(key, {
                    productId: productExist._id,
                    selectedColor: item.selectedColor,
                    quantity: item.quantity,
                    price: realPrice,
                    discountPercentage
                })
            }
        }

        const mergedItems = Array.from(itemsMap.values()) // convertir a array 

        let total = 0

        for (const item of mergedItems) {
            total += item.price * item.quantity
        }

        const delivery = total > 499 ? 0 : 50

        cart.items = mergedItems
        cart.total = total
        cart.delivery = delivery

        await cart.save()

        const cartResponse = await buildCartResponse(cart._id.toString());

        return res.status(200).json({
            status: "success",
            mensaje: "Carrito cargado del Local Storage correctamente",
            cart: cartResponse
        });


    } catch (error) {
        console.log(colors.red.bold("Error al cargar carrito LS"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}
