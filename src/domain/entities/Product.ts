import type {
  Decimal,
  JsonValue,
} from "../../../generated/prisma/internal/prismaNamespace";

export class Product {
  constructor(
    public readonly skuId: string,
    public name: string,
    public ean: string | null,
    public price: Decimal,
    public imageUrl: string | null,
    public brand: string | null,
    public readonly rawJson: JsonValue,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
