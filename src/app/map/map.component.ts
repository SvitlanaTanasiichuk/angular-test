import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {CurrentUser} from '../shared/models/currentUser';
import {Router} from '@angular/router';
import {ResponseModel} from '../shared/models/responseModel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  users$: Subscription;
  allUsers;
  zoom = 8;
  lat = 50.271678;
  lng = 30.312568;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
      this.users$ = this.userService.getAllUsers(50, 1)
        .subscribe(res => {
            this.allUsers = res['result']
          }
        );
    }
}

