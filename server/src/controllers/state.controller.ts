import { Request, Response } from "express";
import colors from 'colors'

import { State } from "../models/State";

export const getStates = async (req: Request, res: Response) => {

    try {
        const states = await State
            .find()
            .sort({ name: 1 });

        if (states.length === 0) {
            throw new Error('No hay estados')
        }

        return res.status(200).json({
            status: "success",
            states
        });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener estados de méxico"));
        return res.status(400).json({
            status: "error",
            mensaje: error instanceof Error ? error.message : "Error desconocido"
        });
    }
}
