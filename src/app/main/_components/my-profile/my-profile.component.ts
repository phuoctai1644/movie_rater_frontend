import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/_services';
import { ToastService } from 'src/app/core/_services';
import { User } from '../../_models';

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
    private authService: AuthService
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
    this.authService.getProfile()
      .subscribe({
        next: response => {
          this.userInfo = response;
          this.form.controls['userName'].setValue(response.username);
          this.form.controls['firstName'].setValue(response.first_name);
          this.form.controls['lastName'].setValue(response.last_name);
          this.form.controls['email'].setValue(response.email);
        },
        error: error => {
          this.toast.error(error.message);
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
    console.log(rawValue);
  }
}
