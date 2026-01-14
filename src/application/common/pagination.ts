import type { ProductFindManyArgs } from "../../../generated/prisma/models";

export interface IPageableRequest {
  page?: number;
  pageSize?: number;
  filters?: ProductFindManyArgs;
}

export interface IPageableResult<T> {
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  records: T[];
}
