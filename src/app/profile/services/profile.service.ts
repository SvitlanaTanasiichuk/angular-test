import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CurrentUser} from '../../shared/models/currentUser';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../../shared/services/users.service';

const url = `${environment.apiUrl}/v1/user`;


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    public http: HttpClient,
    public userService: UsersService
  ) {}

  /**
   * PUT method for updating the profile
   */
  updateProfile(body): Observable<CurrentUser> {
    return this.http.put<CurrentUser>(`${url}/profile`, body)
      .pipe(
        map((result: CurrentUser) => {
            return {
              ...body
            };
          }
        ),
        catchError(this.userService.handleError)
      );
  }


  /**
   *  POST method for updating the profile image
   */
  updateProfileImage(image: File){
    const profileData = new FormData();
    profileData.append('image', image);
    return this.http.post<CurrentUser>(`${url}/profile/image`, profileData)
      .subscribe((res: CurrentUser) => res),
      catchError(this.userService.handleError);
  }

  /**
   *  DELETE method for deleting the profile image
   */
  deleteProfileImage() {
    return this.http.delete(`${url}/profile/image`)
      .pipe(
        catchError(this.userService.handleError)
      );
  }

  /**
   * PUT method for updating the profile location
   */
  addUserLocation(body): Observable<CurrentUser> {
    return this.http.put(`${url}/location`, body)
      .pipe(
        map(res => res['result']),
        catchError(this.userService.handleError)
      );
  }
}
