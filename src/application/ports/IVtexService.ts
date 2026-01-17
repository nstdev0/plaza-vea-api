import type { VtexProduct } from "../../infrastructure/types/VtexTypes.js";

export interface IVtexService {
  fetchMany(from: string, to: string): Promise<VtexProduct[] | null>;
  fetchByEan(ean: string): Promise<VtexProduct | null>;
  fetchBySkuId(skuId: string): Promise<VtexProduct | null>;
}
