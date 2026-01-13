import { Request, Response } from "express"
import colors from 'colors'

import { TSubscriber } from "../types/communication";
import { Subscriber } from "../models/Subscriber";
import { addSubscriberService, removeSubscriberService } from "../services/subscriber/subscriber.service";
import { removeAddressService } from "../services/user/user.service";

export const addSubscriber = async (req: Request<{}, {}, TSubscriber>, res: Response) => {
    let params = req.body
    try {
        await addSubscriberService(params)
    
        return res.status(200).json({
            status: "success",
            mensaje: "Email registrado con exito"
        });

    } catch (error) {
        console.log(colors.red.bold("Error al registrar suscriptor"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}

export const redirectToRemovePage = (req: Request<TSubscriber, {}, {}>, res: Response) => {
    const email = req.params.email

    const frontendUrl = `${process.env.FRONTEND_URL}/desubscribir?email=${encodeURIComponent(email)}`;
    return res.redirect(frontendUrl);
};


export const removeSubscriber = async (req: Request<TSubscriber, {}, {}>, res: Response) => {
    const email = decodeURIComponent(req.params.email);

    try {
        await removeSubscriberService(email)

        return res.status(200).json({
            status: "success",
            mensaje: "Tu suscripción ha sido eliminada"
        });

    } catch (error) {
        console.error(colors.red.bold("Error al eliminar suscriptor:"), error);
        return res.status(500).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};
