import express  from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/handleInputErrors';
import { addSubscriber, redirectToRemovePage, removeSubscriber } from '../controllers/subscriber.controller';

const router = express.Router();

router.post("/add",
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    addSubscriber
);

router.get("/redirect-remove/:email", redirectToRemovePage);

router.delete("/remove/:email", removeSubscriber);

export default router;