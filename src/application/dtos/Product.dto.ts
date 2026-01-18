export interface ProductResponse {
  skuId: string;
  name: string;
  searchName: string;
  ean: string | null;
  price: number;
  imageUrl: string | null;
  brand: string | null;
  category: string[];
  rawJson: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
