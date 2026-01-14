import { Router, type Application } from "express";
import { ProductController } from "../presentation/controllers/product.controller";
import { GetProductBySkuIdUseCase } from "../application/use-cases/GetProductBySkuId.use-case";
import { ProductRepository } from "@infrastructure/repositories/ProductRepository";
import { VtexService } from "../application/services/Vtex.service";
import { GetAllProductsUseCase } from "../application/use-cases/GetAllProducts.use-case";

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
