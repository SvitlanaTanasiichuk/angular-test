import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CurrentUser} from '../models/currentUser';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {ResponseModel} from '../models/responseModel';

const url = `${environment.apiUrl}/v1/user`;

@Injectable({
  providedIn: 'root'
})
export class UsersService{
  readonly headers;

 constructor(public http: HttpClient) {
   this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
  /**
   * The method handle error in catchError block
   *
   */
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }


  /**
   *  GET method for getting all users
   */
  getAllUsers(perPage?: number, page?: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${url}?perPage=${perPage}&page=${page}`)
      .pipe(
        map((res: ResponseModel) => res),
        catchError(this.handleError)
      );
  }

  /**
   *  GET method for getting single user by ID
   */
  getUserById(id: number) {
    return this.http.get(`${url}/${id}`)
      .pipe(
        map((res: CurrentUser) => res['result']),
        catchError(this.handleError)
      );
  }

  /**
   *  GET method for getting current user
   */
  getCurrentUser() {
    return this.http.get(`${url}/current?expand=expand`)
      .pipe(
        map((res: CurrentUser) => res['result']),
        catchError(this.handleError)
      );
  }


  /**
   *  GET method for getting ingle user by PARAM
   */
  getUserByParam(searchString: string | null, radius: number, lat: number, lon: number, perPage: number, page: number) {
    const currentUrl = `${url}/search?searchString=${searchString}&radius=${radius}&lat=${lat}&lon=${lon}&perPage=${perPage}&page=${page}`;
    return this.http.get(currentUrl)
      .pipe(
        map((res: CurrentUser[]) => {
          return {
            ...res
          };
        }),
        catchError(this.handleError)
      );
  }
}
