import type { IProductRepository } from "@domain/repositories/IProductRepository.js";
import type { IVtexService } from "../services/IVtexService.js";
import { ProductMapper } from "@infrastructure/mappers/ProductMapper.js";

export class GetProductByEanUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly vtexService: IVtexService
  ) {}

  async execute(ean: string) {
    const localProduct = await this.productRepository.findByEan(ean);
    if (localProduct) return localProduct;

    const externalData = await this.vtexService.fetchByEan(ean);
    if (!externalData) throw new Error("Product not found");

    const newProduct = ProductMapper.toDomain(externalData);
    await this.productRepository.create(newProduct);
    return newProduct;
  }
}
