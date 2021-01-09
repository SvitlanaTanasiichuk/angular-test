import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CurrentUser} from '../shared/currentUser';
import {UsersService} from '../services/users.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<CurrentUser[]>;

  constructor(
    private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.users$ = this.userService.getAllUsers()
      .pipe(
        map(users => users)
      );
  }
}
