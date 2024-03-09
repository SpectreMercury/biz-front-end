export interface ApiResponse<T> {
  code: number;
  errMsg: string | null;
  data: T;
}
