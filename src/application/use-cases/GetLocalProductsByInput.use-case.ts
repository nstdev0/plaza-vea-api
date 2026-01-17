import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type {
  IPageableRequest,
  IPageableResult,
} from "../common/pagination.js";
import type { ProductResponse } from "../dtos/Product.dto.js";

export class GetLocalProductsByInput {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    filters: IPageableRequest,
  ): Promise<IPageableResult<ProductResponse>> {
    return await this.productRepository.getAll(filters);
  }
}
