import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"
import path from "path";
import fs from "fs";

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

const deleteSingleUploadedFile = (file: Express.Multer.File) => {
    try {
        const filePath = path.join(__dirname, "../uploads/categories", file.filename);
        fs.unlinkSync(filePath);
        console.log("Eliminado archivo único:", file.filename);
    } catch (e) { }
};


const deleteUploadedFiles = (files: Express.Multer.File[]) => {
    for (const file of files) {
        try {
            const filePath = path.join(__dirname, "../uploads/products", file.filename);
            fs.unlinkSync(filePath);
            console.log("Eliminada basura:", file.filename);
        } catch (e) { }
    }
};