import { DeleteAllUseCase } from "./application/use-cases/DeleteAll.use-case.js";
import { GetAllProductsUseCase } from "./application/use-cases/GetAllLocalProducts.use-case.js";
import { GetManyVtexProductsUseCase } from "./application/use-cases/GetManyVtexProducts.use-case.js";
import { GetManyVtexProductsAndSaveUseCase } from "./application/use-cases/GetManyVtexProductsAndSave.use-case.js";
import { GetProductBySkuIdUseCase } from "./application/use-cases/GetVtexProductBySkuId.use-case.js";
import { VtexService } from "./infrastructure/adapters/VtexService.adapter.js";
import { ProductRepository } from "./infrastructure/persistence/Prisma.ProductRepository.js";
import { ProductController } from "./presentation/controllers/Product.controller.js";

// Repositories
export const productRepository = new ProductRepository();

// Services
export const vtexService = new VtexService();

// Use-cases
export const getProductBySkuIdUseCase = new GetProductBySkuIdUseCase(
  productRepository,
  vtexService,
);
export const getAllProductsUseCase = new GetAllProductsUseCase(
  productRepository,
);
export const getManyVtexProductsUseCase = new GetManyVtexProductsUseCase(
  vtexService,
);
export const getManyVtexProductsAndSaveUseCase =
  new GetManyVtexProductsAndSaveUseCase(vtexService, productRepository);
export const deleteAllUseCase = new DeleteAllUseCase(productRepository);

// Controllers
export const productController = new ProductController(
  getAllProductsUseCase,
  getProductBySkuIdUseCase,
  getManyVtexProductsUseCase,
  getManyVtexProductsAndSaveUseCase,
  deleteAllUseCase,
);
