import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {UsersService} from '../shared/services/users.service';
import {CurrentUser} from '../shared/models/currentUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$: Observable<CurrentUser>;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.user$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.userService.getUserById(params['id']);
        })
      );
  }
}


