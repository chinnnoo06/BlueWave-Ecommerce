import { Request, Response } from "express"
import colors from 'colors'

import { TSubscriber } from "../types/communication";
import { Subscriber } from "../models/Subscriber";
import { sendWelcomeSubscriberEmail } from "../services/email/email.service";

export const addSubscriber = async (req: Request<{}, {}, TSubscriber>, res: Response) => {
    let params = req.body;
    try {
        const subscriberExist = await Subscriber.findOne({ email: params.email })

        if (subscriberExist) {
            throw new Error('Este correo ya esta registrado')
        }

        const newSubscriber = new Subscriber(params)
        await newSubscriber.save()

        await sendWelcomeSubscriberEmail(params.email)

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
        await Subscriber.findOneAndDelete({ email });

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
