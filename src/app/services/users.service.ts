import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentUser} from '../shared/currentUser';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(perPage?: number, page?: number): Observable<CurrentUser[]> {
    const url = `${environment.apiUrl}/v1/user?perPage=${perPage}&page=${page}`;
    return this.http.get<CurrentUser[]>(url)
      .pipe(
        map((res: CurrentUser[]) => res['result'])
      );
  }

  getUserById(id: number) {
    const url = `${environment.apiUrl}v1/user/${id}`;
    return this.http.get(url)
      .pipe(
        map((res: CurrentUser) => res['result'])
      );
  }
}
