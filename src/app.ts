import express, { type Application } from "express";
import morgan from "morgan";
import { errorHandler } from "./presentation/middlewares/errorHandler";

import productRoutes from "./routes/products";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

// // Setup dependencies:

// // Infrastructure
// const productRepository = new ProductRepository();
// const vtexService = new VtexService();

// // Use-cases
// const getProductBySkuIdUseCase = new GetProductBySkuIdUseCase(
//   productRepository,
//   vtexService
// );

// // Controllers
// const productController = new ProductController(getProductBySkuIdUseCase);

// Routes
app.use("/api/products", productRoutes);

app.use("/api", (req, res) => {
  res.send("API is running");
});

// Middleware
app.use(errorHandler);

export default app;
