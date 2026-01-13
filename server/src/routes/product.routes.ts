import express from 'express';
import { body, param } from "express-validator";
import multer from 'multer';
import path from "path";
import fs from "fs";
import { auth, authOptional } from '../middleware/auth';
import { handleInputErrors } from '../middleware/handleInputErrors';
import { convertProductToWebP } from '../middleware/convertToWebP';

import { addProduct, removeProduct, addPromotion, removePromotion, updateProduct, getProducts, getCarouselProducts, getSearch, getOneProduct } from '../controllers/products.controller';

const router = express.Router();

// Configuración de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../uploads/products");

        if (!fs.existsSync(dir)) { //para que si no existe la crea
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const productName = req.body.name;

        const sanitized = productName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase();

        // Detectar índice de la imagen y el nombre del color desde el fieldname
        // Ej: fieldname = colorImages[0]
        const match = file.fieldname.match(/colorImages\[(\d+)\]/);
        const colorIndex = match ? parseInt(match[1]) : 0;

        // Obtener el color correspondiente del body
        let colorName = "color";
        if (req.body.colors) {
            try {
                const colors = JSON.parse(req.body.colors);
                if (colors[colorIndex] && colors[colorIndex].color) {
                    colorName = colors[colorIndex].color.replace(/[^a-z0-9]/gi, "_").toLowerCase();
                }
            } catch (err) {
                // fallback si no se puede parsear
            }
        }

        if (!req.colorCounters) req.colorCounters = {};
        if (!req.colorCounters[colorIndex]) req.colorCounters[colorIndex] = 0;
        const imageIndex = req.colorCounters[colorIndex]++;
        const timestamp = Date.now();

        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${sanitized}-${colorName}-${imageIndex}-${timestamp}${ext}`)
    }
});

const productUploads = multer({ storage });

router.get("/get/:category/:page",
    getProducts
)

router.get("/get-carousel",
    getCarouselProducts
)

router.get("/get/:slugId",
    getOneProduct
)


router.get("/get-search/:search/:page",
    authOptional,
    getSearch
)

router.post("/add",
    auth(['admin']),
    productUploads.any(),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('category').notEmpty().withMessage('La categoría es obligatoria').isMongoId().withMessage('El ID es incorrecto'),
    body('price').notEmpty().withMessage('El precio es obligatorio').isFloat({ gt: 0 }).withMessage('Precio invalido'),
    body('colors').notEmpty().withMessage('Los colores son obligatorios'),
    handleInputErrors,
    convertProductToWebP,
    addProduct
);

router.patch("/update/:id",
    auth(['admin']),
    productUploads.any(),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('category').notEmpty().withMessage('La categoría es obligatoria').isMongoId().withMessage('El ID es incorrecto'),
    body('price').notEmpty().withMessage('El precio es obligatorio').isFloat({ gt: 0 }).withMessage('Precio invalido'),
    body('colors').notEmpty().withMessage('Los colores son obligatorios'),
    handleInputErrors,
    convertProductToWebP,
    updateProduct
);


router.delete("/remove/:id",
    auth(['admin']),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    removeProduct
)

router.patch("/add-promotion/:id",
    auth(['admin']),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    body('active').notEmpty().withMessage('El estado es obligatorio').isBoolean().withMessage('Estado invalido'),
    body('discountPercentage').notEmpty().withMessage('El descuento es obligatorio').isInt({ min: 1, max: 90 }).withMessage('Descuento inválido (1-90%)'),
    handleInputErrors,
    addPromotion
)

router.patch("/remove-promotion/:id",
    auth(['admin']),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    removePromotion
)




export default router;
