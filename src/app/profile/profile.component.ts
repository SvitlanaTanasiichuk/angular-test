import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProfileService } from './services/profile.service';
import { UsersService } from '../shared/services/users.service';
import { CurrentUser } from '../shared/models/currentUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  selectedFile: File = null;
  user: CurrentUser;
  imageData: string;
  imgForm: FormGroup;
  form: FormGroup;
  submitted: boolean;
  profileSubscription: Subscription = null;
  userSubscription: Subscription = null;
  deleteSubscription: Subscription = null;
  imageSubscription: Subscription = null;

  constructor(
    private profileService: ProfileService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.initializeImageForm();
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    } else if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    } else if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    } else if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }

  // On submitting the form with user info
  public submit() {
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
  this.profileSubscription = this.profileService.updateProfile(profile)
    .subscribe(res => {
      this.form.reset();
      this.submitted = false;
    });
  }

  // On upload the image
  public onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imgForm.patchValue({image: file});
    const allowedMimeTypes = ['image/png', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      },
      reader.readAsDataURL(file);
    }
  }

  // When image already upload submitting the form
  public onSubmit() {
    this.imageSubscription = this.profileService.updateProfileImage(this.imgForm.value.image)
    .subscribe((res: CurrentUser) => {
      this.imgForm.reset();
      return res;
    },
    error => console.log(error)
    );
  }

  // When  deleting the image
  public deleteImage() {
    this.deleteSubscription = this.profileService.deleteProfileImage()
      .subscribe(res => res);
  }

   // Initialize form with image
   private initializeImageForm() {
    this.imgForm = new FormGroup({
      image: new FormControl(null)
    });
  }

  private initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      gender: new FormControl(this.user.gender, Validators.required),
      country: new FormControl(this.user.country, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
    });
  }

    // Initialize component with params
    private getCurrentUser() {
      this.userSubscription = this.userService.getCurrentUser()
        .subscribe(user => {
          this.user = user;
          this.initializeForm();
        },
          error => console.log(error)
        );
    }
}
