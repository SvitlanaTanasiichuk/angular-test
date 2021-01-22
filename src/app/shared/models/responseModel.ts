import {CurrentUser} from './currentUser';

export interface ResponseModel {
  code: string;
  status: string;
  message: string;
  result: CurrentUser | null;
  _meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}
