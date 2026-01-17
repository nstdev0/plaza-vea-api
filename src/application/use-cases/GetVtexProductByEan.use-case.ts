import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { IVtexService } from "../ports/IVtexService.js";
import { ProductMapper } from "../../infrastructure/mappers/ProductMapper.js";
import type { ProductResponse } from "../dtos/Product.dto.js";

export class GetProductByEanUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly vtexService: IVtexService,
  ) {}

  async execute(ean: string): Promise<ProductResponse> {
    const localProduct = await this.productRepository.findByEan(ean);
    if (localProduct) return ProductMapper.fromPersistanceToDto(localProduct);

    const externalData = await this.vtexService.fetchByEan(ean);
    if (!externalData) throw new Error("Product not found");

    const domainProduct = ProductMapper.fromVtexToDomain(externalData);
    const newProduct = await this.productRepository.create(domainProduct);
    return ProductMapper.fromPersistanceToDto(newProduct);
  }
}
