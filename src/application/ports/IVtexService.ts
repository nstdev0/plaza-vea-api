import type { VtexProduct } from "../types/VtexTypes.js";

export interface IVtexService {
  fetchMany(from: string, to: string, supermarket: string): Promise<VtexProduct[] | null>;
  fetchBySkuId(skuId: string, supermarket: string): Promise<VtexProduct | null>;
}
