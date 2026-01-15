import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { IVtexService } from "../services/IVtexService.js";
import { ProductMapper } from "../../infrastructure/mappers/ProductMapper.js";

interface GetManyVtexProductsAndSaveUseCaseResponse {
  totalSaved: number;
}

export class GetManyVtexProductsAndSaveUseCase {
  constructor(
    private readonly vtexService: IVtexService,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(
    from: string,
    to: string
  ): Promise<GetManyVtexProductsAndSaveUseCaseResponse> {
    const vtexProducts = await this.vtexService.fetchMany(from, to);

    let response: GetManyVtexProductsAndSaveUseCaseResponse = { totalSaved: 0 };

    if (!vtexProducts || vtexProducts.length <= 0) {
      return response;
    }

    let total = 0;

    for (const product of vtexProducts) {
      if (product.items[0]) {
        const skuId = product.items[0].itemId;
        const existingProduct = await this.productRepository.findBySkuId(skuId);

        if (!existingProduct) {
          const newProduct = ProductMapper.toDomain(product);
          await this.productRepository.create(newProduct);
          total++;
        }
        // throw new AppError(409, `Product with SKU ID ${skuId} already exists.`);
      }
      //   throw new AppError(404, "SkuId not found.");
    }

    response = {
      totalSaved: total,
    };

    return response;
  }
}
