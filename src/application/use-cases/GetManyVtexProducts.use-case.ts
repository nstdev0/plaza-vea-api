import type { IVtexService } from "../ports/IVtexService.js";

export class GetManyVtexProductsUseCase {
  constructor(private readonly vtexService: IVtexService) {}

  async execute(from: string, to: string, supermarket: string) {
    const vtexProducts = await this.vtexService.fetchMany(from, to, supermarket);
    return vtexProducts;
  }
}
