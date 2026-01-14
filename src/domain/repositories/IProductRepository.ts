import type { Product } from "@domain/entities/Product";
import type { Prisma } from "../../../generated/prisma/browser";
import type {
  ProductCreateInput,
  ProductFindManyArgs,
  ProductUpdateInput,
} from "../../../generated/prisma/models";
import type { DefaultArgs } from "@prisma/client/runtime/client";
import type {
  IPageableRequest,
  IPageableResult,
} from "../../application/common/pagination";

export interface IProductRepository {
  getAll(filters: IPageableRequest): Promise<IPageableResult<Product>>;
  findBySkuId(skuId: string): Promise<Product | null>;
  findByEan(ean: string): Promise<Product | null>;
  create(data: ProductCreateInput): Promise<Product>;
  update(data: ProductUpdateInput, skuId: string): Promise<Product>;
  delete(skuId: string): Promise<void>;
}
