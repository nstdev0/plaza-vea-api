export interface ProductResponse {
  skuId: string;
  name: string;
  searchName: string;
  ean: string | null;
  price: number;
  imageUrl: string | null;
  brand: string | null;
  categories: string[];
  rawJson: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
