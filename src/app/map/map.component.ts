import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CurrentUser} from '../shared/currentUser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  users$: Observable<CurrentUser[]>;
  zoom = 8;
  lat = 50.271678;
  lng = 30.312568;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
      this.users$ = this.userService.getAllUsers()
        .pipe(
          map(users => users)
        );
    }
  }

