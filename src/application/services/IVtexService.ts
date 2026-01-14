import type { Product } from "@domain/entities/Product.js";

export interface IVtexService {
  fetchByEan(ean: string): Promise<Product | null>;
  fetchBySkuId(skuId: string): Promise<Product | null>;
}
