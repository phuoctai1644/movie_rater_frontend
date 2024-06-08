import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserService } from 'src/app/auth/_services';
import { ToastService } from 'src/app/core/_services';
import { User } from '../../_models';
import { AuthState, GetProfileActions, selectLoggedUser } from 'src/app/core/_stores/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  userInfo!: User;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private authService: AuthService,
    private store: Store<AuthState>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  createForm() {
    this.form = this.formBuilder.group({
      userName: [this.userInfo.username, [Validators.required]],
      firstName: [this.userInfo.first_name, [Validators.required]],
      lastName: [this.userInfo.last_name, [Validators.required]],
      email: [this.userInfo.email, [Validators.required]],
      avatar: [this.userInfo.avatar ?? null]
    })
  }

  getUserInfo() {
    this.store.select(selectLoggedUser).subscribe(response => {
      if (response) {
        this.userInfo = response;
        this.createForm();
      }
    })
  }

  onSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    delete rawValue.avatar;
    this.userService.updateProfile(this.userInfo.id, rawValue)
      .subscribe({
        next: user => {
          this.userInfo = user;
          this.toast.success('Updated successfully!');
        },
        error: data => {
          this.toast.error(data.error.message);
        }
      })
  }

  onFileChanged() {
    let file = this.fileInput.nativeElement.files?.[0];

    if (file) {
      const payload = { avatar: file };
      this.userService.changeAvatar(payload, this.userInfo.id)
        .subscribe({
          next: () => {
            this.toast.success('Avatar updated successfully!');
            this.store.dispatch(GetProfileActions.get());
          },
          error: data => {
            this.toast.error(data.error.message);
          }
        })
    }
  }
}
