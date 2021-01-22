import { ResponseModel } from '../../shared/models/responseModel';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  users$: Observable<ResponseModel>;
  pageSize = 50;
  pageIndex = 1;
  resultLength: number = null;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
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
     this.users$ = this.userService.getAllUsers(this.pageSize, this.pageIndex);
      }
}
