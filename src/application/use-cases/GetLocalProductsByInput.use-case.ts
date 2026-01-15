import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type {
  IPageableRequest,
  IPageableResult,
} from "../common/pagination.js";
import type { Product } from "../../domain/entities/Product.js";

export class GetLocalProductsByInput {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(filters: IPageableRequest): Promise<IPageableResult<Product>> {
    return await this.productRepository.getAll(filters);
  }
}
