import type { VtexProduct } from "../../infrastructure/types/VtexTypes.js";
import type { IVtexService } from "./IVtexService.js";
import { AppConfig } from "../../config/config.js";

export class VtexService implements IVtexService {
  // Tipado de retorno explícito: Promesa de Producto o Null
  async fetchByEan(ean: string): Promise<VtexProduct | null> {
    try {
      const response = await fetch(
        `${AppConfig.VTEX_API_URL}fq=ean:${ean}&=&=&sc=9`
      );

      if (!response.ok) {
        console.warn(
          `[VtexService] Error HTTP ${response.status} para EAN ${ean}`
        );
        return null;
      }

      const rawData = await response.json();

      if (!Array.isArray(rawData) || rawData.length === 0) {
        return null;
      }

      return rawData[0] as VtexProduct;
    } catch (error) {
      console.error(`[VtexService] Fallo de red al buscar EAN ${ean}:`, error);
      return null;
    }
  }

  async fetchBySkuId(skuId: string): Promise<VtexProduct | null> {
    try {
      const response = await fetch(
        `${AppConfig.VTEX_API_URL}fq=skuId:${skuId}&=&=&sc=9`
      );

      if (!response.ok) {
        console.warn(
          `[VtexService] Error HTTP ${response.status} para skuId ${skuId}`
        );
        return null;
      }

      const rawData = await response.json();

      if (!Array.isArray(rawData) || rawData.length === 0) {
        return null;
      }

      return rawData[0] as VtexProduct;
    } catch (error) {
      console.error(
        `[VtexService] Fallo de red al buscar skuId ${skuId}:`,
        error
      );
      return null;
    }
  }
}
