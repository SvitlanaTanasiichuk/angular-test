import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
