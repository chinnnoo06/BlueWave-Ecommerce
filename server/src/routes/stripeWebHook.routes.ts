import express  from 'express';
import { stripeWebhook } from '../controllers/stripeWebHook.controller';

const router = express.Router();

router.post("/stripe-webhook",
   stripeWebhook
);



export default router;