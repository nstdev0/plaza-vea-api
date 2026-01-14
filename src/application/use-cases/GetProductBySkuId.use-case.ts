import type { IProductRepository } from "@domain/repositories/IProductRepository";
import type { IVitexService } from "../services/IVtexService";
import { Product } from "@domain/entities/Product";
import { ProductMapper } from "@infrastructure/mappers/ProductMapper";

export class GetProductBySkuIdUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly vtexService: IVitexService
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
