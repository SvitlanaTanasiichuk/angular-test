import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // On submitting the register form
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.register(user).subscribe(res => {
      this.form.reset();
      this.router.navigate(['/profile']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
