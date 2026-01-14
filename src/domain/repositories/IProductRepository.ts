import type { Product } from "@domain/entities/Product";
import type { Prisma } from "../../../generated/prisma/browser";
import type {
  ProductCreateInput,
  ProductFindManyArgs,
  ProductUpdateInput,
} from "../../../generated/prisma/models";
import type { DefaultArgs } from "@prisma/client/runtime/client";

export interface IProductRepository {
  findAll(filters: ProductFindManyArgs<DefaultArgs>): Promise<Product[]>;
  findBySkuId(skuId: string): Promise<Product | null>;
  findByEan(ean: string): Promise<Product | null>;
  create(data: ProductCreateInput): Promise<Product>;
  update(data: ProductUpdateInput, skuId: string): Promise<Product>;
  delete(skuId: string): Promise<void>;
}
