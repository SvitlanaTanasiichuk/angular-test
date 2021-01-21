import { ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnDestroy {

  usersSub: Subscription;
  allUsers;
  zoom = 8;
  lat = 50.271678;
  lng = 30.312568;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  // Subscription to get all user on the map
  getUsers() {
      this.usersSub = this.userService.getAllUsers(50, 1)
        .subscribe(res => {
            this.allUsers = res['result']
          }
        );
    }
}

