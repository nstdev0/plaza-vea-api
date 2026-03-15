export interface ProductResponse {
  skuId: string;
  name: string;
  searchName: string;
  price: number;
  imageUrl: string | null;
  brand: string | null;
  category: string[];
  description?: string | null;
  supermarket: string;
  createdAt: Date;
  updatedAt: Date;
}
