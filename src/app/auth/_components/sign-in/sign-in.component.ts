import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, SignInActions } from 'src/app/core/_stores/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [, [Validators.required]],
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
    this.store.dispatch(SignInActions.signIn({ payload: rawValue }));
  }
}
