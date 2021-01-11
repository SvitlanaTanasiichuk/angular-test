import { Component, OnInit } from '@angular/core';
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
    this.userService.getUserByParam(searchValue, '30', '0', '0', '50', '1')
      .subscribe(res => {
        if (res['result[0]']) {
          const id = res['result[0]'];
          this.router.navigate(['/user/', id]);
        }
      });
  }
}
