export interface SearchUserContext {
  searchString: string | null;
  radius: number;
  lat: number;
  lon: number;
  perPage: number;
  page: number;
}
