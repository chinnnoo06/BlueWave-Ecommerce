import express  from 'express';
import { auth } from '../middleware/auth';
import { checkOut, getPurchases, validateCard } from '../controllers/purchase.controller';

const router = express.Router();

router.post("/checkout",
    auth(['client']),
    checkOut
);

router.post("/validate",
    auth(['client']),
    validateCard
);

router.get("/get",
    auth(['client']),
    getPurchases
);



export default router;