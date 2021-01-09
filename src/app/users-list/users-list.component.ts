import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CurrentUser} from '../shared/currentUser';
import {UsersService} from '../services/users.service';
import {catchError, map} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  users$: Observable<CurrentUser[]>;

  constructor(
    private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.users$ = this.userService.getAllUsers(80, 1)
      .pipe(
        map(users => users)
      );
  }
}
