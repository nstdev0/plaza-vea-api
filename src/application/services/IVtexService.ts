import type { Product } from "@domain/entities/Product";

export interface IVitexService {
  fetchByEan(ean: string): Promise<Product | null>;
  fetchBySkuId(skuId: string): Promise<Product | null>;
}
