import { NextFunction, Request, Response } from "express";
import colors from 'colors'

import { getStatesService } from "../services/state/state.service";

export const getStates = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const states = await getStatesService()

        return res.status(200).json({
            status: "success",
            states
        });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener estados de méxico"));
        next(error);
    }
}
