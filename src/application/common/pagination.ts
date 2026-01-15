import type { ProductFindManyArgs } from "../../generated/prisma/models.js";

export interface IPageableRequest {
  page?: number;
  pageSize?: number;
  search?: string | null;
  filters?: ProductFindManyArgs;
}

export interface IPageableResult<T> {
  totalData: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalRecords: number;
  records: T[];
}
