export interface IPageableRequest {
  page?: number;
  pageSize?: number;
  search?: string | null;
  filters?: {
    category?: string;
    orderBy?: string;
    price?: string;
  };
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
