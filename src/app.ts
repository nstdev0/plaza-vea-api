import { ProductRepository } from "@infrastructure/repositories/ProductRepository";
import express, { type Application } from "express";
import { VtexService } from "./application/services/Vtex.service";
import { ProductController } from "./presentation/controllers/product.controller";
import { errorHandler } from "./presentation/middlewares/errorHandler";
import { GetProductBySkuIdUseCase } from "./application/use-cases/GetProductBySkuId.use-case";

const app: Application = express();

app.use(express.json());

// Infrastructure
const productRepository = new ProductRepository();
const vtexService = new VtexService();

// Use-cases
const getProductBySkuIdUseCase = new GetProductBySkuIdUseCase(
  productRepository,
  vtexService
);

// Controllers
const productController = new ProductController(getProductBySkuIdUseCase);

// Routes
app.get("/api/products/skuId/:skuId", productController.getOne);

// Middleware
app.use(errorHandler);

export default app;
