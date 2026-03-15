import type { VtexProduct } from "../../application/types/VtexTypes.js";
import type { IVtexService } from "../../application/ports/IVtexService.js";
import { AppConfig } from "../../config/config.js";

export class VtexService implements IVtexService {
  // Tipado de retorno explícito: Promesa de Producto o Null

  private getApiUrl(supermarket: string): string {
    const url = supermarket === "wong" ? AppConfig.WONG_API_URL : AppConfig.MAKRO_API_URL;
    if (!url) return "";
    return url.endsWith("?") || url.endsWith("&") ? url : `${url}&`;
  }

  async fetchMany(from: string, to: string, supermarket: string): Promise<VtexProduct[] | null> {
    try {
      const apiUrl = this.getApiUrl(supermarket);
      const response = await fetch(
        `${apiUrl}_from=${from}&_to=${to}`,
      );

      console.log(["VtexService", `Executing fetch from ${from} to ${to} for ${supermarket}`]);

      if (!response.ok) {
        console.warn(
          `[VtexService] Error HTTP ${response.status} al buscar muchos productos`,
          response.statusText,
        );
        return [];
      }

      const rawData = await response.json();

      if (!Array.isArray(rawData) || rawData.length === 0) {
        return [];
      }

      return rawData as VtexProduct[];
    } catch (error) {
      console.error(
        `[VtexService] Fallo de red al buscar muchos productos:`,
        error,
      );
      return null;
    }
  }

  async fetchBySkuId(skuId: string, supermarket: string): Promise<VtexProduct | null> {
    try {
      const apiUrl = this.getApiUrl(supermarket);
      const response = await fetch(
        `${apiUrl}fq=skuId:${skuId}&=&=&sc=9`,
      );

      if (!response.ok) {
        console.warn(
          `[VtexService] Error HTTP ${response.status} para skuId ${skuId}`,
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
        error,
      );
      return null;
    }
  }
}
