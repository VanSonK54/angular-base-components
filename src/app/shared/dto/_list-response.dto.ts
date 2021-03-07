export interface ListResponseDTO<T> {
    pageSize: number,
    pageIndex: number,
    totalCount: number,
    items: T[]
  }