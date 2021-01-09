import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../services/profile.service";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    });
  }

  submit() {
  if (this.form.invalid) {
    return;
  }
  this.submitted = true;

  const profile = {
    firstName: this.form.value.firstName,
    lastName: this.form.value.lastName,
    gender: this.form.value.gender,
    country: this.form.value.country,
    city: this.form.value.city
  };
  this.profileService.updateProfile(profile)
    .subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/map'])
    });
  }

}
