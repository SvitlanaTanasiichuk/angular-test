import { Pipe, PipeTransform } from '@angular/core';
import {CurrentUser} from '../models/currentUser';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: CurrentUser[], userName = ''): any {
    if (!userName.trim()) {
      return users;
    }
    return users.filter( user => {
      return user?.lastName?.toLowerCase().includes((userName.toLowerCase()));
    });
  }

}
