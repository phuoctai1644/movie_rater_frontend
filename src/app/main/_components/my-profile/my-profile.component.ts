import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/_services';
import { ToastService } from 'src/app/core/_services';
import { User } from '../../_models';
import { AuthState, selectLoggedUser } from 'src/app/core/_stores/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  form!: FormGroup;
  userInfo!: User;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private authService: AuthService,
    private store: Store<AuthState>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUserInfo();
  }

  createForm() {
    this.form = this.formBuilder.group({
      userName: [, [Validators.required]],
      firstName: [, [Validators.required]],
      lastName: [, [Validators.required]],
      email: [, [Validators.required]]
    })
  }

  getUserInfo() {
    this.store.select(selectLoggedUser).subscribe(response => {
      if (response) {
        this.userInfo = response;
        this.form.controls['userName'].setValue(response.username);
        this.form.controls['firstName'].setValue(response.first_name);
        this.form.controls['lastName'].setValue(response.last_name);
        this.form.controls['email'].setValue(response.email);
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
    this.authService.updateProfile(this.userInfo.id, rawValue)
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
}
