import { MaterialModule } from './../../shared/modules/material.module';
import { UsersRoutingModule } from './../users-routing-module';
import { UsersListComponent } from './../users-list/users-list.component';
import { UserComponent } from './../user/user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule { }
