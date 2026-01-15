import express from 'express';
import { body, param } from "express-validator";
import { addCategory, getCategories, removeCategory, updateCategory } from '../controllers/category.controller';
import { auth } from '../middleware/auth';
import { handleInputErrors } from '../middleware/handleInputErrors';
import { convertCategoryToWebP } from '../middleware/convertToWebP';
import multer from 'multer';
import path from "path";
import fs from "fs";

const router = express.Router();

// Configuración de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const dir = path.join(__dirname, "../uploads/categories");

        if (!fs.existsSync(dir)) { //para que si no existe la crea
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const categoryName = req.body.name;
        console.log(categoryName)
        const sanitized = categoryName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase();
        console.log(sanitized)
        const ext = path.extname(file.originalname);
        cb(null, `category-${sanitized}${ext}`);
    }
});

const categoryUploads = multer({ storage });

router.get("/get", getCategories);

router.post("/add",
    auth(['admin']),
    categoryUploads.single('file'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('slug').notEmpty().withMessage('El slug es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    convertCategoryToWebP,
    addCategory
);

router.delete("/remove/:id",
    auth(['admin']),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    removeCategory
)

router.patch("/update/:id",
    auth(['admin']),
    categoryUploads.single('file'),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('slug').notEmpty().withMessage('El slug es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    convertCategoryToWebP,
    updateCategory
)

export default router;
