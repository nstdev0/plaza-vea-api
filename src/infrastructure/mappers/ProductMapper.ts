// src/infrastructure/mappers/ProductMapper.ts
import { Decimal } from "@prisma/client/runtime/index-browser";
import { Product } from "src/domain/entities/Product.js";

export class ProductMapper {
  static toDomain(raw: any): Product {
    // 1. Validaciones defensivas
    if (!raw.items || raw.items.length === 0) {
      throw new Error(
        `Producto VTEX inválido: Sin Items (SKUs). ID: ${raw.productId}`
      );
    }

    // 2. Selección de datos
    // Tomamos el primer SKU (usualmente es la presentación principal)
    const item = raw.items[0];

    // Buscamos el vendedor por defecto (Plaza Vea/Makro) o el primero disponible
    // const seller =
    //   sku.sellers.find((s: any) => s.sellerDefault) || sku.sellers[0];

    // if (!seller) {
    //   throw new Error(
    //     `Producto VTEX inválido: Sin Vendedores. SKU: ${sku.itemId}`
    //   );
    // }

    // 3. Obtención de imagen (Manejo de array vacío)
    // const imageUrl =
    //   sku.images && sku.images.length > 0 ? sku.images[0].imageUrl : null;

    // 4. Construcción de la Entidad
    return new Product(
      item.itemId, // skuId
      item.name, // name
      item.ean || null, // ean (puede venir null)
      new Decimal(item.sellers[0].commertialOffer.Price), // price (Convertimos number a Decimal)
      item.images[0].imageUrl || null, // imageUrl
      raw.brand || null, // brand
      raw, // rawJson (Guardamos todo el original)
      new Date(), // createdAt (Es nuevo)
      new Date() // updatedAt (Es nuevo)
    );
  }
}
