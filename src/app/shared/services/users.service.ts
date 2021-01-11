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

  getAllUsers(perPage?: number, page?: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${url}?perPage=${perPage}&page=${page}`)
      .pipe(
        map((res: ResponseModel) => res),
        catchError(this.handleError)
      );
  }

  getUserById(id: number) {
    return this.http.get(`${url}/${id}`)
      .pipe(
        map((res: CurrentUser) => res['result']),
        catchError(this.handleError)
      );
  }

  getUserByParam(searchString: string | null, radius: string, lat: string, lon: string, perPage: string, page: string) {
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

  updateProfile(body): Observable<CurrentUser> {
    return this.http.put<CurrentUser>(`${url}/profile`, body)
      .pipe(
        map((result: CurrentUser) => {
            return {
              ...body
            };
          }
        ),
        catchError(this.handleError)
      );
  }

  updateProfileImage(image, options: {}){
    return  this.http.post(`${url}/profile/image`, image, options)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  addUserLocation(body): Observable<CurrentUser> {
    return this.http.put(`${url}/location`, body)
      .pipe(
        map(res => res['result']),
        catchError(this.handleError)
      );
  }
}
