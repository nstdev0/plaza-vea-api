import type { Price } from "../value-objects/Price.js";

export class Product {
  constructor(
    public readonly skuId: string,
    public name: string,
    public searchName: string,
    public ean: string | null,
    public price: Price,
    public imageUrl: string | null,
    public brand: string | null,
    public category: string[],
    public readonly rawJson: any,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
