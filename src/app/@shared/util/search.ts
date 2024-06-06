export class Search {
  static InitialSearchOptions(): string{
    return Search.toQuerySearchOptions({page: 0, limit: 10})
  }
  static toQuerySearchOptions(searchOptions: any): string {

    return '?' + Object.keys(searchOptions)
      .map((key) => `${key}=${searchOptions[key]}`)
      .join('&');
  }
}

export interface DefaultSearchOptions {
  page: number;
  limit: number;
}
