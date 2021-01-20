import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProfileComponent} from './profile/profile.component';
import {UsersListComponent} from './users-list/users-list.component';
import {MapComponent} from './map/map.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {AuthGuard} from './auth/services/auth.guard';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
      {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
      {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./profile/modules/profile.module').then(m => m.ProfileModule)},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
