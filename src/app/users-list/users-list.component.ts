import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';

import {CurrentUser} from '../shared/models/currentUser';
import {UsersService} from '../shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  usersSub: Subscription;
  allUsers: CurrentUser | null;
  pageSize = 50;
  pageIndex = 1;
  resultLength: number = null;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  // Get value from paginator
  onPageChanged(event: PageEvent) {
    this.resultLength = event.length;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadAllUsers();
  }

  // Subscription to load all users
  loadAllUsers() {
    this.usersSub = this.userService.getAllUsers(this.pageSize, this.pageIndex)
      .subscribe( res => {
          this.allUsers = res['result'];
          this.resultLength = res._meta.pagination.totalCount;
        });
      }
}
