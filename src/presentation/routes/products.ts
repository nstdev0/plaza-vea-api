import { ProductRepository } from "@infrastructure/repositories/ProductRepository.js";
import { Router } from "express";
import { VtexService } from "src/application/services/Vtex.service.js";
import { GetAllProductsUseCase } from "src/application/use-cases/GetAllProducts.use-case.js";
import { GetProductBySkuIdUseCase } from "src/application/use-cases/GetProductBySkuId.use-case.js";
import { ProductController } from "../controllers/product.controller.js";

const router: Router = Router();

const vtexService = new VtexService();
const productRepository = new ProductRepository();

// Use-cases
const getProductBySkuIdUseCase = new GetProductBySkuIdUseCase(
  productRepository,
  vtexService
);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);

// Controllers
const productController = new ProductController(
  getAllProductsUseCase,
  getProductBySkuIdUseCase
);

router.get("/", productController.getAll);
router.get("/skuId/:skuId", productController.getOne);

export default router;
