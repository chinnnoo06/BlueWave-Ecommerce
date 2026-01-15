import dotenv from "dotenv";
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY
export const BACKEND_URL = process.env.BACKEND_URL!
export const FRONTEND_URL = process.env.FRONTEND_URL!
export const PORT = process.env.PORT!
export const GMAIL_USER = process.env.GMAIL_USER!
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD!
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!
export const VITE_STRIPE_PUBLIC_KEY = process.env.VITE_STRIPE_PUBLIC_KEY!
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
