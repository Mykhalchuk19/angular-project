export enum StatusEnum {
  INACTIVE = 0,
  ACTIVE = 1,
}

enum SuccessStatus {
  SUCCESS = 200,
}

export type CommonResponse = {
  statusCode: SuccessStatus,
  message: string;
};

export type QueryParams = {
  search?: string,
  sort?: string,
  limit: number,
  page: number,
};

export type ListMeta = {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
};

export type ListResponse<T> = {
  items: T,
  meta: ListMeta
};

export type QueryId = {
  id: string,
};
