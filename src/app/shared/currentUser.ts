export interface CurrentUser {
  firstname: string;
  lastName: string;
  gender: string;
  country: string;
  city: string;
  email: string | null;
  image: string | null;
  lat: string | null;
  lon: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  id: number | null;
}
