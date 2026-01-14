import type { JsonValue } from "@prisma/client/runtime/client";

export interface VtexRawProduct {
  productName: string;
  brand: string;
  items: Array<{
    itemId: string;
    name: string;
    ean?: string;
    images: Array<{ imageUrl: string }>;
    sellers: Array<{
      sellerDefault: boolean;
      commertialOffer: {
        Price: number;
        AvailableQuantity: number;
        IsAvailable: boolean;
      };
    }>;
  }>;
  [key: string]: JsonValue; // Permite propiedades extra para el rawJson
}
