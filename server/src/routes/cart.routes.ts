import express from 'express';
import { body } from "express-validator";
import { auth } from '../middleware/auth';
import { handleInputErrors } from '../middleware/handleInputErrors';
import { addToCart, clearCart, decreaseToCart, getCart, getLSCard, loadLSCard, pruebaCart, removeItem } from '../controllers/cart.controller';

const router = express.Router();

router.patch("/add",
    auth(['client']),
    body('productId').notEmpty().withMessage('El id del producto es obligatorio').isMongoId().withMessage('El ID es incorrecto'),
    body('selectedColor').notEmpty().withMessage('El color es obligatorio').isInt({ min: 0 }).withMessage('Indice de color invalido'),
    handleInputErrors,
    addToCart
);

router.patch("/decrease",
    auth(['client']),
    body('productId').notEmpty().withMessage('El id del producto es obligatorio').isMongoId().withMessage('El ID es incorrecto'),
    body('selectedColor').notEmpty().withMessage('El color es obligatorio').isInt({ min: 0 }).withMessage('Indice de color invalido'),
    handleInputErrors,
    decreaseToCart
);

router.patch("/remove",
    auth(['client']),
    body('productId').notEmpty().withMessage('El id del producto es obligatorio').isMongoId().withMessage('El ID es incorrecto'),
    body('selectedColor').notEmpty().withMessage('El color es obligatorio').isInt({ min: 0 }).withMessage('Indice de color invalido'),
    handleInputErrors,
    removeItem
);

router.patch("/clear",
    auth(['client']),
    clearCart
);

router.get("/get",
    auth(['client']),
    getCart
);

router.post("/get-ls",
    body('items').isArray({ min: 1 }).withMessage("Items debe ser un array"),
    body("items.*.productId").isMongoId().withMessage("productId inválido"),
    body("items.*.selectedColor").isInt({ min: 0 }).withMessage("selectedColor inválido"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Cantidad invaida"),
    handleInputErrors,
    getLSCard
);

router.put("/load",
    auth(['client']),
    body('items').isArray({ min: 1 }).withMessage("Items debe ser un array"),
    body("items.*.productId").isMongoId().withMessage("productId inválido"),
    body("items.*.selectedColor").isInt({ min: 0 }).withMessage("selectedColor inválido"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Cantidad invaida"),
    handleInputErrors,
    loadLSCard
);

export default router;