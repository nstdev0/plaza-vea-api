import { Decimal } from "@prisma/client/runtime/index-browser";
import { Product } from "../../domain/entities/Product.js";
import { Price } from "src/domain/value-objects/Price.js";

export class ProductMapper {
  static toDomain(raw: any): Product {
    // Validaciones defensivas
    if (!raw.items || raw.items.length === 0) {
      throw new Error(
        `Producto VTEX inválido: Sin Items (SKUs). ID: ${raw.productId}`,
      );
    }

    // Selección de datos
    // Tomamos el primer SKU (usualmente es la presentación principal)
    const item = raw.items[0];

    const itemId = item.itemId;
    const name = item.name;
    const searchName = item.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ean = item.ean;
    const price = Price.fromFloat(
      Number(item.sellers[0].commertialOffer.Price),
    );
    const image = item.images[0].imageUrl;
    const brand = raw.brand;
    const categories = item.categories;
    const rawProduct = raw;
    const createdAt = new Date();
    const updatedAt = new Date();

    // Construcción de la Entidad
    return new Product(
      itemId,
      name,
      searchName,
      ean,
      price,
      image,
      brand,
      categories,
      rawProduct,
      createdAt,
      updatedAt,
    );
  }

  static toPersistance(product: Product) {
    return {
      skuId: product.skuId,
      name: product.name,
      searchName: product.searchName,
      ean: product.ean,
      price: product.price.toFloat(),
      imageUrl: product.imageUrl,
      brand: product.brand,
      categories: product.categories,
      rawJson: product.rawJson,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
