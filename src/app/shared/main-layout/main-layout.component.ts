import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = null;
  searchValue: string;
  radius = 30;
  lat = 50.271678;
  lng = 30.312568;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout($event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public performSearch(searchValue) {
    const params = {
      searchString: searchValue,
      radius: this.radius,
      lat: this.lat,
      lon: this.lng,
      perPage: 50,
      page: 1
    }
    this.userSubscription = this.userService.getUserByParam(params)
      .subscribe((res: any) => {
        if (res) {
          const id = res.result[0].id;
          this.router.navigate(['users/user/', id]);
        }
      });
  }
}
