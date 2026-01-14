import type { Product } from "@domain/entities/Product.js";
import type {
  IPageableRequest,
  IPageableResult,
} from "src/application/common/pagination.js";
import type { ProductCreateInput } from "src/generated/prisma/models.js";

export interface IProductRepository {
  getAll(filters: IPageableRequest): Promise<IPageableResult<Product>>;
  findBySkuId(skuId: string): Promise<Product | null>;
  findByEan(ean: string): Promise<Product | null>;
  create(data: ProductCreateInput): Promise<Product>;
}
