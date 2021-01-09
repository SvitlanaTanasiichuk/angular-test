import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    const url = `${environment.apiUrl}/v1/user/register`;
    return this.http.post(url, user)
      .pipe(
        tap(this.setToken)
      );
  }

  login(user: User){
    const url = `${environment.apiUrl}/v1/user/login`;
    return this.http.post<User>(url, user)
      .pipe(
        tap(this.setToken)
      );
    }

  private setToken(response) {
    if (response) {
      localStorage.setItem('expiredAt', response.result.expiredAt);
      localStorage.setItem('token', response.result.token);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expiredAt = localStorage.getItem('expiredAt');
    return localStorage.getItem('token');
  }

  logout() {
    const url = `${environment.apiUrl}/v1/user/logout`;
    this.setToken(null);
    return this.http.post(url, null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
