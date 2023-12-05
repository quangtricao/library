export type PaginationResponse = {
  page: number;
  totalPages: number;
};

export type PaginationRequestParams = {
  page?: number;
  limit?: number;
};
