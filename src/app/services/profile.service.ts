import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CurrentUser} from '../shared/models/currentUser';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

    updateProfile(body): Observable<CurrentUser> {
      const url = `${environment.apiUrl}/v1/user/profile`;
      return this.http.put<CurrentUser>(url, body)
        .pipe(
          map((result) => {
            return {
              ...body
            };
          })
        );
    }

    updateProfileImage(image): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/v1/user/profile/image`;
    return  this.http.put<CurrentUser>(url, image)
      .pipe(
        map(res => res)
      );
    }

    addUserLocation(body): Observable<CurrentUser> {
      const url = `${environment.apiUrl}/v1/user/location`;
      return this.http.put(url, body)
        .pipe(
          map(res => res['result'])
        );
    }
}
