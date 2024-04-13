import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services';
import { ToastService } from 'src/app/core/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]]
    })
  }

  onSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    this.authService.signUp(rawValue).subscribe({
      next: response => {
        this.toastService.success('Signed up successfully!');
        setTimeout(() => {
          this.router.navigate(['/auth/sign-in']);
        }, 1500);
      },
      error: error => {
        this.toastService.error(error.message);
      }
    })
  }
}
