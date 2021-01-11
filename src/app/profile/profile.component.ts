import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UsersService} from '../shared/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  selectedFile: File = null;
  form: FormGroup;
  submitted: boolean;
  image;
  profileSub: Subscription = null;

  constructor(
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
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

  this.profileSub = this.userService.updateProfile(profile)
    .subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/map']);
    });
  }

    onFileSelected(event) {
      this.selectedFile = <File> event.target.files[0];
      console.log(event);
    }

    onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.userService.updateProfileImage(fd, {
      reportProgress: true,
      observe: 'events'
    })
     .subscribe(res => {
         console.log(res);
    }
   );
  }
}
