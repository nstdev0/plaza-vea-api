import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { IVtexService } from "../ports/IVtexService.js";
import { ProductMapper } from "../../infrastructure/mappers/ProductMapper.js";

export class GetProductBySkuIdUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly vtexService: IVtexService,
  ) {}

  async execute(skuId: string, supermarket: string) {
    const localProduct = await this.productRepository.findBySkuId(skuId);

    if (localProduct) {
      console.log("Producto fetcheado localmente");
      return localProduct;
    }

    const vtexResponse = await this.vtexService.fetchBySkuId(skuId, supermarket);
    if (!vtexResponse) throw new Error("Product not found");

    const productEntity = ProductMapper.fromVtexToDomain(vtexResponse, supermarket);
    await this.productRepository.create(productEntity);
    console.log("Producto fetcheado de vtex");
    return productEntity;
  }
}
