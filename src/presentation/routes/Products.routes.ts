import { Router } from "express";
import { VtexService } from "../../application/services/Vtex.service.js";
import { ProductRepository } from "../../infrastructure/repositories/Prisma.ProductRepository.js";
import { GetProductBySkuIdUseCase } from "../../application/use-cases/GetVtexProductBySkuId.use-case.js";
import { GetAllProductsUseCase } from "../../application/use-cases/GetAllLocalProducts.use-case.js";
import { ProductController } from "../controllers/Product.controller.js";
import { GetManyVtexProductsUseCase } from "../../application/use-cases/GetManyVtexProducts.use-case.js";
import { GetManyVtexProductsAndSaveUseCase } from "../../application/use-cases/GetManyVtexProductsAndSave.use-case.js";

const router: Router = Router();

const vtexService = new VtexService();
const productRepository = new ProductRepository();

// Use-cases
const getProductBySkuIdUseCase = new GetProductBySkuIdUseCase(
  productRepository,
  vtexService
);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getManyVtexProductsUseCase = new GetManyVtexProductsUseCase(vtexService);
const getManyVtexProductsAndSaveUseCase = new GetManyVtexProductsAndSaveUseCase(
  vtexService,
  productRepository
);

// Controllers
const productController = new ProductController(
  getAllProductsUseCase,
  getProductBySkuIdUseCase,
  getManyVtexProductsUseCase,
  getManyVtexProductsAndSaveUseCase
);

router.get("/", productController.getAllLocal);
router.get("/skuId/:skuId", productController.getOne);
router.post("/vtex", productController.getManyVtex);
router.post("/vtex/getAndSave", productController.getAndSaveManyVtex);

// Cron endpoint to fetch and save products from VTEX
router.get("/cron-fetch", productController.cronFetch);

export default router;
