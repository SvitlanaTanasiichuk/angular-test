import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  // isSubmitting$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.login(user).subscribe(res => {
      console.log(res)
      this.form.reset()
      this.router.navigate(['/']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }
}
