import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout($event) {
  event.preventDefault()
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
