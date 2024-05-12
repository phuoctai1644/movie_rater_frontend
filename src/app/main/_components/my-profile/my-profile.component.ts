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
    this.userInfo = this.authService.getLoggedUser();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      userName: [this.userInfo.username, [Validators.required]],
      firstName: [this.userInfo.first_name, [Validators.required]],
      lastName: [this.userInfo.last_name, [Validators.required]],
      email: [this.userInfo.email, [Validators.required]]
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
