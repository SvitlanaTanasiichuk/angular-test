import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from '../../shared/services/users.service';
import { ResponseModel } from '../../shared/models/responseModel';

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

  // Observable$ to load all users
  loadAllUsers() {
     this.users$ = this.userService.getAllUsers(this.pageSize, this.pageIndex)
     .pipe(
       map((users: ResponseModel) => {
        this.resultLength = users._meta.pagination.totalCount;
        this.pageIndex = users._meta.pagination.currentPage;
        return users;
       })
     );
  }

  trackByUser(index: number, user: any): number {
    return user.id;
  }
}
