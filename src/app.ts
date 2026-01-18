import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./presentation/middlewares/errorHandler.js";
import { AppConfig } from "./config/config.js";
import { ProductRoutes } from "./presentation/routes/Products.routes.js";
import { productController } from "./dependency-injection.js";

const app: Application = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  max: 100, // Máximo 100 peticiones por IP cada 15 min
  standardHeaders: true, // Devuelve headers `RateLimit-*` (Estándar moderno)
  legacyHeaders: false, // Deshabilita headers `X-RateLimit-*` (Viejos)
  message: {
    status: 429,
    error: "Too many requests",
    message:
      "Has excedido el límite de peticiones. Intenta de nuevo en 15 minutos.",
  },
});

app.use((helmet as unknown as Function)());
app.use(
  cors({
    origin: (origin, callback) => {
      // Caso 1: Peticiones sin origen (como Postman o Server-to-Server calls desde Next.js Server Components)
      if (!origin) return callback(null, true);

      // Caso 2: El origen está en la lista blanca
      if (AppConfig.ALLOWED_ORIGINS?.includes(origin)) {
        return callback(null, true);
      }
      // Caso 3: Bloqueado
      console.error(`Bloqueado por CORS: ${origin}`); // Útil para debugging
      return callback(new Error("No permitido por CORS"));
    },
    credentials: true,
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/health");
});

// app.use("/api", apiLimiter);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

app.use("/api/products", ProductRoutes.getRoutes(productController));

app.use("/api/", (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Middleware
app.use(errorHandler);

export default app;
