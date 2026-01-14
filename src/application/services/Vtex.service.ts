import type { IVitexService } from "./IVtexService";
import { AppConfig } from "@config/config";

export class VtexService implements IVitexService {
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
