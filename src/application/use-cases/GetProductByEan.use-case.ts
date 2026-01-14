import { Product } from "@domain/entities/Product";
import type { IProductRepository } from "@domain/repositories/IProductRepository";
import { mapToEntity } from "@infrastructure/mappers/ProductMapper";
import type { IVitexService } from "../services/IVtexService";

export class GetProductByEanUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly vtexService: IVitexService
  ) {}

  async execute(ean: string) {
    const localProduct = await this.productRepository.findByEan(ean);

    if (localProduct) return localProduct;

    const externalData = await this.vtexService.fetchByEan(ean);
    if (!externalData) throw new Error("Product not found");
    const product = mapToEntity(externalData);
    const newProduct = new Product(product);
    await this.productRepository.create(newProduct);
    return newProduct;
  }
}
