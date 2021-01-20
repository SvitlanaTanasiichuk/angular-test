import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.token;
      req = req.clone({
          setHeaders: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        }
      );
    }

    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
          }
          return throwError(error);
        })
      );
  }
}
