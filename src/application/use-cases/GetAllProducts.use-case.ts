import type { ProductRepository } from "../../infrastructure/repositories/ProductRepository.js";
import type { IPageableRequest } from "../common/pagination.js";

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(filters: IPageableRequest) {
    return this.productRepository.getAll(filters);
  }
}
