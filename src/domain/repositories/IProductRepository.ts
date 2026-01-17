import type {
  IPageableRequest,
  IPageableResult,
} from "../../application/common/pagination.js";
import type { ProductCreateInput } from "../../generated/prisma/models.js";
import type { Product } from "../entities/Product.js";

export interface IProductRepository {
  getAll(filters: IPageableRequest): Promise<IPageableResult<Product>>;
  findBySkuId(skuId: string): Promise<Product | null>;
  findByEan(ean: string): Promise<Product | null>;
  create(data: ProductCreateInput): Promise<Product>;
  deleteAll(): Promise<boolean>;
}
