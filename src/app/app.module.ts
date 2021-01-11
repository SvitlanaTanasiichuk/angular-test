import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MapComponent } from './map/map.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/services/auth.service';
import {AuthInterceptor} from './shared/services/auth.interceptor';
import { HomeComponent } from './home/home.component';
import {AgmCoreModule} from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipes/search.pipe';
import {MaterialModule} from './shared/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ProfileComponent,
    UsersListComponent,
    MapComponent,
    UserComponent,
    HomeComponent,
    SearchPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBe62-SiV5opsO8Vy6TgoR8F6jjHgaIK_o'
        })
    ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
