import type { VtexProduct } from "src/infrastructure/types/VtexTypes.js";

export interface IVtexService {
  fetchByEan(ean: string): Promise<VtexProduct | null>;
  fetchBySkuId(skuId: string): Promise<VtexProduct | null>;
}
