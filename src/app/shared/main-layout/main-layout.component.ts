import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userName: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
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

  onSubmit(event: any) {
    return this.userService.getUserByParam(this.userName, '', '', '' , '', '');
  }
}
