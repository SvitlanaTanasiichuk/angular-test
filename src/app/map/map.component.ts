import { ResponseModel } from './../shared/models/responseModel';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  users$: Observable<ResponseModel>;
  pageSize: number = 50;
  pageIndex: number = 1
  zoom = 8;
  lat = 50.271678;
  lng = 30.312568;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // Subscription to get all user on the map
  getUsers() {
    this.users$  = this.userService.getAllUsers(this.pageSize, this.pageIndex)
    }
}

