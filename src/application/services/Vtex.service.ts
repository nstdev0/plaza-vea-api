import { AppConfig } from "@config/config.js";
import type { IVtexService } from "./IVtexService.js";

export class VtexService implements IVtexService {
  constructor() {}

  async fetchByEan(ean: string) {
    const response = await fetch(`${AppConfig.VTEX_API_URL}fq=ean:${ean}&sc=9`);
    const [data] = await response.json();
    return data;
  }

  async fetchBySkuId(skuId: string) {
    const response = await fetch(
      `${AppConfig.VTEX_API_URL}fq=skuId:${skuId}&=&=&sc=9`
    );
    const [data] = await response.json();
    return data;
  }
}
