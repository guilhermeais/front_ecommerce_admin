export interface ResponseData<I> {
  total: number;
  pages: number;
  currentPage: number;
  items: I[];
}

export interface pageOptions {
  page: number;
  limit: number;
}
