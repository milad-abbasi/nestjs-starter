export interface PaginatedData<T> {
  data: T[];
  count: number;
}

export interface UpdateResult {
  ok: number;
  n: number;
  nModified: number;
}

export interface DeleteResult {
  ok?: number;
  n?: number;
  deletedCount?: number;
}
