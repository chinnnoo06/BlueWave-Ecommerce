import express from 'express';
import { body, param } from "express-validator";
import { addFavorite, contactEmail, createCodeToRecoverPassword, forwardEmail, getFavoriteProducts, getProfile, login, logout, registerUser, removeAddress, removeFavorite, saveNewPassword, updateAddress, updateUserInfo, updateUserPassword, validateCodeToRecoverPassword, verifyAccount, verifySuccessToken } from "../controllers/user";
import { auth, authOptional } from '../middleware/auth';
import { handleInputErrors } from '../middleware/handleInputErrors';

const router = express.Router();

router.post("/register",
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    body('phone').notEmpty().withMessage('El telefono es obligatorio').isMobilePhone('es-MX').withMessage('El teléfono no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    registerUser
);

router.post("/login",
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    login
)

router.post("/logout", auth(), logout)

router.post("/forward-email",
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    forwardEmail
)

router.post("/create-code-to-recover-password",
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    createCodeToRecoverPassword
)

router.post("/verify-code-to-recover-password",
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    body('code').notEmpty().withMessage('El código es obligatorio').isLength({ min: 6, max: 6 }).withMessage('El codigo no es válido'),
    handleInputErrors,
    validateCodeToRecoverPassword
)

router.post("/save-new-password",
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    body('newPassword').notEmpty().withMessage('La nueva contraseña es obligatoria').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    saveNewPassword
)

router.get("/verify-account",
    verifyAccount
)

router.post("/verify-success",
    verifySuccessToken
);

router.get("/profile", authOptional, getProfile)

router.patch("/update-info",
    auth(['client']),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    body('phone').notEmpty().withMessage('El telefono es obligatorio').isMobilePhone('es-MX').withMessage('El teléfono no es válido'),
    handleInputErrors,
    updateUserInfo
)

router.patch("/update-password",
    auth(['client']),
    body('oldPassword').notEmpty().withMessage('La contraseña vieja es obligatoria').isLength({ min: 6 }).withMessage('La contraseña vieja debe tener al menos 6 caracteres'),
    body('newPassword').notEmpty().withMessage('La contraseña nueva es obligatoria').isLength({ min: 6 }).withMessage('La contraseña nueva debe tener al menos 6 caracteres'),
    handleInputErrors,
    updateUserPassword
)

router.patch("/update-address",
    auth(['client']),
    body('street').notEmpty().withMessage('La calle es obligatoria'),
    body('number').notEmpty().withMessage('Es número es obligatorio').matches(/^\d+$/).withMessage('El número debe contener solo números'),
    body('state').notEmpty().withMessage('El estado es obligatorio'),
    body('city').notEmpty().withMessage('La ciudad es obligatoria'),
    body('postalCode').notEmpty().withMessage('El código postal es obligatorio').matches(/^\d+$/).withMessage('El código postal debe contener solo números'),
    handleInputErrors,
    updateAddress
)

router.patch("/remove-address",
    auth(['client']),
    removeAddress
)

router.patch("/add-favorites",
    auth(['client']),
    body('_id').notEmpty().withMessage('El id del producto es obligatorio').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    addFavorite
)

router.patch("/remove-favorites",
    auth(['client']),
    body('_id').notEmpty().withMessage('El id del producto es obligatorio').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    removeFavorite
)

router.get("/get-favorites",
    auth(['client']),
    getFavoriteProducts
)

router.post("/contact-email",
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    body('phone').notEmpty().withMessage('El telefono es obligatorio').isMobilePhone('es-MX').withMessage('El teléfono no es válido'),
    body('subject').notEmpty().withMessage('El tema es obligatorio'),
    body('message').notEmpty().withMessage('El mensaje es obligatorio').isLength({ max: 450 }).withMessage("La cantidad máxima de caracteres del mensaje son 450"),
    handleInputErrors,
    contactEmail
)
export default router;