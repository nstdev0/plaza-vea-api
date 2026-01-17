import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";

export class DeleteAllUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute() {
    await this.productRepository.deleteAll();
    return;
  }
}
