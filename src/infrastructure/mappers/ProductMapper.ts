import type { ProductResponse } from "../../application/dtos/Product.dto.js";
import { Product } from "../../domain/entities/Product.js";
import { Price } from "../../domain/value-objects/Price.js";

export class ProductMapper {
  static fromVtexToDomain(raw: any): Product {
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
    const price = Price.fromFloat(item.sellers[0].commertialOffer.Price);

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

  static fromDomainToPersistance(product: Product) {
    return {
      skuId: product.skuId,
      name: product.name,
      searchName: product.searchName,
      ean: product.ean,
      price: product.price.getAmount(),
      imageUrl: product.imageUrl,
      brand: product.brand,
      categories: product.categories,
      rawJson: product.rawJson,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static fromPersistanceToDomain(product: any): Product {
    return new Product(
      product.skuId,
      product.name,
      product.searchName,
      product.ean,
      Price.fromCents(product.price),
      product.imageUrl,
      product.brand,
      product.categories,
      product.rawJson,
      product.createdAt,
      product.updatedAt,
    );
  }

  static fromPersistanceToDto(product: Product): ProductResponse {
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
