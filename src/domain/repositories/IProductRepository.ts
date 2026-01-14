import type { Product } from "@domain/entities/Product";
import type {
  IPageableRequest,
  IPageableResult,
} from "../../application/common/pagination";

export interface IProductRepository {
  getAll(filters: IPageableRequest): Promise<IPageableResult<Product>>;
  findBySkuId(skuId: string): Promise<Product | null>;
  findByEan(ean: string): Promise<Product | null>;
}
