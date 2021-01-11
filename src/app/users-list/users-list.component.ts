import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CurrentUser} from '../shared/models/currentUser';
import {UsersService} from '../shared/services/users.service';
import {catchError, map} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ResponseModel} from '../shared/models/responseModel';

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
  pageSizeOptions: number[] = [25, 50, 100];
  resultLength: number = null;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  onPageChanged(event: PageEvent) {
    console.log(this.resultLength);
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  loadAllUsers() {
    this.usersSub = this.userService.getAllUsers(this.pageSize, 1)
      .subscribe( res => {
          this.allUsers = res['result'];
          this.resultLength = res._meta.pagination.totalCount;
        });
      }
}
