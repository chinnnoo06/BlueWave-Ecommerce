import { NextFunction, Request, Response } from "express"
import path from "path"
import sharp from "sharp"
import fs from "fs";

export const convertCategoryToWebP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isAddRoute = req.originalUrl.includes("/add");
        const file = req.file;

        // Si es la ruta de agregar categoría, la imagen es obligatoria
        if (isAddRoute && !req.file) {
            return res.status(400).json({
                status: "error",
                mensaje: "La imagen es obligatoria para agregar una categoría",
            });
        }

        // Si es update y NO mandaron archivo → continuar sin convertir
        if (!isAddRoute && !req.file) {
            return next();
        }

        const ext = path.extname(file.path).toLowerCase();


        if (ext === ".webp") {
            console.log(`Saltando conversión porque ya es WebP: ${file.filename}`);
            return next();
        }

        const outputPath = file.path.replace(ext, ".webp");

        let converted = false;
        let attempts = 0;
        const maxAttempts = 3;

        while (!converted && attempts < maxAttempts) {
            try {
                attempts++;

                await sharp(file.path)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                // Borrar archivo original si existe
                try {
                    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                } catch (unlinkErr) {
                    console.warn(`⚠ No se pudo eliminar el archivo original:`, unlinkErr);
                }

                // Actualizar req.file al nuevo archivo
                file.path = outputPath;
                file.filename = path.basename(outputPath);

                console.log(`Convertido a WebP: ${file.filename} (Intento ${attempts})`);
                converted = true;

            } catch (err) {
                console.warn(
                    `Error convirtiendo ${file.filename} a WebP (Intento ${attempts}):`,
                    err
                );

                if (attempts >= maxAttempts) {
                    return res.status(500).json({
                        status: "error",
                        mensaje: `No se pudo convertir la imagen ${file.filename}. Intenta nuevamente.`,
                    });
                }
            }
        }

        next();
    } catch (err) {
        console.error("Error inesperado en la conversión a WebP:", err);
        return res.status(500).json({
            status: "error",
            mensaje: "Error inesperado al procesar las imágenes. Intenta nuevamente."
        });
    }
};

export const convertProductToWebP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allFiles: Express.Multer.File[] = [];

        // Este req.files viene de uploads.any()
        if (Array.isArray(req.files)) {
            allFiles.push(...req.files);
        }

        if (allFiles.length === 0) {
            return res.status(400).json({
                status: "error",
                mensaje: "Es obligatorio subir al menos una imagen (colorImages)",
            });
        }

        for (const file of allFiles) {
            const ext = path.extname(file.path).toLowerCase();

            if (ext === ".webp") {
                console.log(`Saltando conversión porque ya es WebP: ${file.filename}`);
                continue;
            }

            const outputPath = file.path.replace(ext, ".webp");

            let converted = false;
            let attempts = 0;
            const maxAttempts = 3;

            while (!converted && attempts < maxAttempts) {
                try {
                    attempts++;

                    await sharp(file.path)
                        .webp({ quality: 80 })
                        .toFile(outputPath);

                    // Borrar archivo original si existe
                    try {
                        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                    } catch (unlinkErr) {
                        console.warn(`⚠ No se pudo eliminar el archivo original:`, unlinkErr);
                    }

                    // Actualizar req.file al nuevo archivo
                    file.path = outputPath;
                    file.filename = path.basename(outputPath);

                    console.log(`Convertido a WebP: ${file.filename} (Intento ${attempts})`);
                    converted = true;

                } catch (err) {
                    console.warn(
                        `Error convirtiendo ${file.filename} a WebP (Intento ${attempts}):`,
                        err
                    );

                    if (attempts >= maxAttempts) {
                        return res.status(500).json({
                            status: "error",
                            mensaje: `No se pudo convertir la imagen ${file.filename}. Intenta nuevamente.`,
                        });
                    }
                }
            }
        }

        next();
    } catch (err) {
        console.error("Error inesperado en la conversión a WebP:", err);
        return res.status(500).json({
            status: "error",
            mensaje: "Error inesperado al procesar las imágenes. Intenta nuevamente."
        });
    }
};

