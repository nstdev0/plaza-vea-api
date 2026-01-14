import type { IProductRepository } from "@domain/repositories/IProductRepository.js";
import type { IVtexService } from "../services/IVtexService.js";
import { ProductMapper } from "@infrastructure/mappers/ProductMapper.js";

export class GetProductBySkuIdUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly vtexService: IVtexService
  ) {}

  async execute(skuId: string) {
    const localProduct = await this.productRepository.findBySkuId(skuId);

    if (localProduct) {
      console.log("Producto fetcheado localmente");
      return localProduct;
    }

    const vtexResponse = await this.vtexService.fetchBySkuId(skuId);
    if (!vtexResponse) throw new Error("Product not found");

    const productEntity = ProductMapper.toDomain(vtexResponse);
    await this.productRepository.create(productEntity);
    console.log("Producto fetcheado de vtex");
    return productEntity;
  }
}
