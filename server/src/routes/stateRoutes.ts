import express  from 'express';
import { body } from 'express-validator';
import { getStates } from '../controllers/state';

const router = express.Router();

router.get("/get", getStates);


export default router;