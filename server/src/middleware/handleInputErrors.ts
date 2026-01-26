import path from "path";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"
import { deleteSingleUploadedFile, deleteUploadedFiles } from "../helpers";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req)

    if (!errors.isEmpty()) {

        if (req.file) {
            deleteSingleUploadedFile(req.file);
        }

        if (req.files) {
            deleteUploadedFiles(req.files as Express.Multer.File[]);
        }

        return res.status(400).json({ errors: errors.array() })
    }

    next()
}