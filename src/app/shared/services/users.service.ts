import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CurrentUser } from '../models/currentUser';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ResponseModel } from '../models/responseModel';

const url = `${environment.apiUrl}/v1/user`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly headers;

 protected constructor(public http: HttpClient) {
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
  public getAllUsers(perPage?: number, page?: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${url}?perPage=${perPage}&page=${page}`,
    {headers: this.headers}
    )
      .pipe(
        map((res: ResponseModel) => res),
        catchError(this.handleError)
      );
  }

  /**
   *  GET method for getting single user by ID
   */
  public getUserById(id: number) {
    return this.http.get<CurrentUser>(`${url}/${id}`,
    {headers: this.headers}
    )
      .pipe(
        map((res: CurrentUser) => res['result']),
        catchError(this.handleError)
      );
  }

  /**
   *  GET method for getting current user
   */
  public getCurrentUser() {
    return this.http.get<CurrentUser>(`${url}/current?expand=expand`,
    {headers: this.headers})
      .pipe(
        map((res: CurrentUser) => res['result']),
        catchError(this.handleError)
      );
  }

  /**
   *  GET method for getting single user by PARAM
   */
  public getUserByParam(context) {
    return this.http.get(`${url}/search`, {
      params: context
    })
      .pipe(
        map((res: CurrentUser) => res),
        catchError(this.handleError)
      );
  }
}
