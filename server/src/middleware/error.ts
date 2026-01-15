import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      status: "error",
      mensaje: error.message
    });
  }

  return res.status(500).json({
    status: "error",
    mensaje: "Error interno del servidor"
  });
};
