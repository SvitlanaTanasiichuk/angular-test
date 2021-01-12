import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
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

  logout($event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  performSearch(searchValue) {
    this.userService.getUserByParam(searchValue, this.radius, this.lat, this.lng, 50, 1)
      .subscribe((res: any) => {
        if (res) {
          const id = res.result[0].id;
          this.router.navigate(['/user/', id]);
        }
      });
  }
}
