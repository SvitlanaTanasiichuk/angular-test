import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription = null;
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

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  // On submitting the login form
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.loginSubscription = this.authService.login(user).subscribe(res => {
      this.form.reset();
      this.router.navigate(['/profile']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }
}
