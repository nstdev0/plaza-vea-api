import type { ProductRepository } from "@infrastructure/repositories/ProductRepository";
import type { IPageableRequest } from "../common/pagination";

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(filters: IPageableRequest) {
    return this.productRepository.getAll(filters);
  }
}
