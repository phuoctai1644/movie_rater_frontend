import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastService } from 'src/app/core/_services';
import { Router } from '@angular/router';
import { UserService } from '../../_services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [, [Validators.required]],
      password: [, [Validators.required]]
    })
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: user => {
        localStorage.setItem('userProfile', JSON.stringify(user));
      },
      error: error => {
        this.toastService.error(error.message);
        this.authService.signOut();
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
    this.authService.signIn(rawValue).subscribe({
      next: response => {
        this.toastService.success('Signed in successfully!');
        this.authService.setAccessToken(response.token);
        this.getProfile();
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      }, 
      error: error => {
        this.toastService.error(error.message);
      }
    })
  }
}
