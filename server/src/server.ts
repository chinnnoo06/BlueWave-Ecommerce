import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'

// DB
import { connection } from './config/conection'

// Ruters
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import productRoutes from './routes/product.routes'
import cartRoutes from './routes/cart.routes'
import purchaseRoutes from './routes/purchase.routes'
import subscriberRoutes from './routes/subscriber.routes'
import articleRoutes from './routes/article.routes'
import stateRoutes from './routes/state.routes'
import stripeWebhookRouter from "./routes/stripeWebHook.routes"

connection()

const server = express();

server.use(cookieParser());

// permitir conexiones
server.use(cors({
    origin: process.env.FRONTEND_URL, // tu frontend
    credentials: true
}));

// Stripe webhook debe ir ANTES de express.json
server.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookRouter
)

// Servir archivos estáticos (uploads)
server.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
)

server.use(express.json());

server.use(morgan('dev'))

// CONFIGURAR ROUTERS
server.use("/api/user", userRoutes)
server.use("/api/category", categoryRoutes)
server.use("/api/product", productRoutes)
server.use("/api/cart", cartRoutes)
server.use("/api/purchase", purchaseRoutes)
server.use("/api/subscriber", subscriberRoutes)
server.use("/api/article", articleRoutes)
server.use("/api/state", stateRoutes)

server.get('/api', (req, res) => {
  res.json({msg: 'Desde API'})
})
export default server