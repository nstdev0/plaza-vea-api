import { Decimal } from "decimal.js";

export class Product {
  constructor(
    public readonly skuId: string,
    public name: string,
    public searchName: string,
    public ean: string | null,
    public price: Decimal,
    public imageUrl: string | null,
    public brand: string | null,
    public categories: string[],
    public readonly rawJson: any,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
