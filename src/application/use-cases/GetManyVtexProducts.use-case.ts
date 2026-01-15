import type { IVtexService } from "../services/IVtexService.js";

export class GetManyVtexProductsUseCase {
  constructor(private readonly vtexService: IVtexService) {}

  async execute(from: string, to: string) {
    const vtexProducts = await this.vtexService.fetchMany(from, to);
    return vtexProducts;
  }
}
