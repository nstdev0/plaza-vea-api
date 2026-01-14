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
  [key: string]: JsonValue;
}

export interface VtexCommertialOffer {
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  FullSellingPrice: number;
  RewardValue: number;
  PriceValidUntil: string;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  // Arrays que pueden venir vacíos, tipados genéricamente
  Installments: Array<{
    Value: number;
    InterestRate: number;
    TotalValuePlusInterestRate: number;
    NumberOfInstallments: number;
    PaymentSystemName: string;
    Name: string;
  }>;
  Teasers: Array<any>;
  DiscountHighLight: Array<any>;
}

// 2. Definición del Vendedor
export interface VtexSeller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: VtexCommertialOffer;
}

// 3. Definición de Imagen
export interface VtexImage {
  imageId: string;
  imageLabel: string | null;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
}

// 4. Definición del SKU (Item individual)
export interface VtexItem {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string; // A veces viene vacío "", ojo con esto en el Mapper
  referenceId: Array<{
    Key: string;
    Value: string;
  }>;
  measurementUnit: string;
  unitMultiplier: number;
  modalType: any | null;
  isKit: boolean;
  images: VtexImage[];
  sellers: VtexSeller[];
  // Variaciones posibles dentro del item
  [key: string]: any;
}

// 5. Interfaz Principal del Producto
export interface VtexProduct {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl: string | null;
  linkText: string;
  productReference: string;
  productReferenceCode: string;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  releaseDate: string; // ISO Date format
  link: string;
  description: string;

  // Clústers y Categorías
  clusterHighlights: Record<string, string>;
  productClusters: Record<string, string>;
  searchableClusters: Record<string, string>;
  categories: string[];
  categoriesIds: string[];

  // Especificaciones fijas que siempre vienen (según tu JSON)
  allSpecifications?: string[];
  allSpecificationsGroups?: string[];

  // Array de SKUs
  items: VtexItem[];

  // PROPIEDADES DINÁMICAS (Especificaciones)
  // VTEX devuelve especificaciones como propiedades directas del objeto
  // Ejemplo: "Tipo de Producto": ["Supermercado"]
  // Usamos index signature para permitirlas
  [key: string]: unknown;
}

// Tipo para la respuesta completa (es un array de productos)
export type VtexSearchResponse = VtexProduct[];
